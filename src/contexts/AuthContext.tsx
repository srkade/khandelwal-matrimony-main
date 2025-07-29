// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: 'user' | 'admin' | 'superadmin' | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'superadmin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log initial state of AuthContext
    console.log('AuthContext useEffect: Initial state - loading:', loading, 'user:', user, 'session:', session);

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => { // Made this callback async
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          await fetchUserRole(session.user.id); // Await this call
        } catch (error) {
          console.error('AuthContext useEffect: Error fetching user role in initial session:', error);
        }
      }
      setLoading(false); // <--- Set to false after session and role fetch attempt
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Log auth state changes
        console.log('AuthContext onAuthStateChange:', event, 'session:', session, 'user:', session?.user);
        if (event === 'SIGNED_OUT') {
          console.log('AuthContext onAuthStateChange: User has signed out.');
        }
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          try {
            await fetchUserRole(session.user.id);
          } catch (error) {
            console.error('AuthContext onAuthStateChange: Error fetching user role:', error);
          }
        } else {
          setUserRole(null);
        }
        // Confirm fetchUserRole has completed before setting loading to false
        console.log('AuthContext onAuthStateChange: fetchUserRole completed, setting loading to false.');
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    console.log('AuthContext fetchUserRole: Entering fetchUserRole for userId:', userId);
    console.log('AuthContext fetchUserRole: Executing Supabase query for user_roles...');
    console.log('AuthContext fetchUserRole: About to make Supabase call for user_roles...');

    const timeoutPromise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error('Supabase query timed out after 20 seconds.'));
      }, 20000); // 10 seconds timeout
    });

    let data = null;
    let error = null;
    try {
      const queryPromise = supabase
        .from('user_roles')
        .select('*') // Changed to select all columns for testing
        .eq('user_id', userId);

      const result = await Promise.race([queryPromise, timeoutPromise]);

      // If result is from timeoutPromise, it would have rejected, so this part won't be reached.
      // If it's from queryPromise, it will be the Supabase response object.
      if (result && 'data' in result && 'error' in result) { // Check if it's a Supabase response
        data = result.data;
        error = result.error;
      } else {
        // This case should ideally not be hit if timeoutPromise rejects correctly
        // but added for robustness.
        console.warn('AuthContext fetchUserRole: Unexpected result from Promise.race:', result);
        error = new Error('Unexpected query result or timeout occurred.');
      }

      console.log('AuthContext fetchUserRole: Supabase user_roles query resolved.');
      console.log('AuthContext fetchUserRole: Supabase user_roles query result - data:', data, 'error:', error);

      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('user'); // Default to user role on error
      } else if (data && data.length > 0) {
        setUserRole(data[0].role || 'user');
      } else {
        console.log('AuthContext fetchUserRole: No user role found for userId:', userId);
        setUserRole('user'); // Default to user role if no entry
      }
      console.log('AuthContext fetchUserRole: User role fetched:', data && data.length > 0 ? data[0].role : 'user');

      // Keep the test query for profiles for now
      console.log('AuthContext fetchUserRole: Running test query for profiles...');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('user_id', userId)
        .single();

      console.log('AuthContext fetchUserRole: Test query for profiles resolved.');
      console.log('AuthContext fetchUserRole: Test query result - profileData:', profileData, 'profileError:', profileError);

    } catch (err) {
      console.error('AuthContext fetchUserRole: Unexpected error during Supabase query or timeout:', err);
      setUserRole('user'); // Ensure loading state is resolved even on error
    }
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user && !error) {
      // Create user role entry
      await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: 'user'
      });
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    console.log('AuthContext signOut: Attempting to sign out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthContext signOut: Error during sign out:', error);
        throw error; // Re-throw to be caught by the caller if needed
      }
      console.log('AuthContext signOut: Successfully signed out from Supabase.');
    } catch (err) {
      console.error('AuthContext signOut: Unexpected error during sign out:', err);
    }
  };

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
