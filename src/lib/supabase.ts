import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add these console.log statements
console.log('Supabase client init: VITE_SUPABASE_URL =', supabaseUrl ? 'Loaded' : 'NOT Loaded');
console.log('Supabase client init: VITE_SUPABASE_ANON_KEY =', supabaseAnonKey ? 'Loaded' : 'NOT Loaded');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Supabase client initialized successfully in src/lib/supabase.ts'); // Add this

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          gender: 'male' | 'female' | 'other';
          gotra: string;
          date_of_birth: string;
          birth_time: string | null;
          birth_place: string;
          education: string;
          profession: string;
          income: string;
          marital_status: 'never_married' | 'divorced' | 'widowed';
          height: number;
          religion: string;
          manglik: 'yes' | 'no' | 'partial';
          horoscope_url: string | null;
          photo_gallery: string[];
          father_name: string;
          mother_name: string;
          siblings: string;
          father_occupation: string;
          expectations: string;
          city: string;
          state: string;
          verification_status: 'pending' | 'approved' | 'rejected';
          is_active: boolean;
          is_premium: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          gender: 'male' | 'female' | 'other';
          gotra: string;
          date_of_birth: string;
          birth_time?: string | null;
          birth_place: string;
          education: string;
          profession: string;
          income: string;
          marital_status: 'never_married' | 'divorced' | 'widowed';
          height: number;
          religion: string;
          manglik: 'yes' | 'no' | 'partial';
          horoscope_url?: string | null;
          photo_gallery?: string[];
          father_name: string;
          mother_name: string;
          siblings: string;
          father_occupation: string;
          expectations: string;
          city: string;
          state: string;
          verification_status?: 'pending' | 'approved' | 'rejected';
          is_active?: boolean;
          is_premium?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          gender?: 'male' | 'female' | 'other';
          gotra?: string;
          date_of_birth?: string;
          birth_time?: string | null;
          birth_place?: string;
          education?: string;
          profession?: string;
          income?: string;
          marital_status?: 'never_married' | 'divorced' | 'widowed';
          height?: number;
          religion?: string;
          manglik?: 'yes' | 'no' | 'partial';
          horoscope_url?: string | null;
          photo_gallery?: string[];
          father_name?: string;
          mother_name?: string;
          siblings?: string;
          father_occupation?: string;
          expectations?: string;
          city?: string;
          state?: string;
          verification_status?: 'pending' | 'approved' | 'rejected';
          is_active?: boolean;
          is_premium?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      interests: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          status: 'pending' | 'accepted' | 'rejected';
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          status?: 'pending' | 'accepted' | 'rejected';
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          status?: 'pending' | 'accepted' | 'rejected';
          message?: string | null;
          created_at?: string;
        };
      };
      shortlists: {
        Row: {
          id: string;
          user_id: string;
          profile_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_id?: string;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          location: string;
          image_url: string | null;
          created_by: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          event_date: string;
          location: string;
          image_url?: string | null;
          created_by: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          event_date?: string;
          location?: string;
          image_url?: string | null;
          created_by?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'user' | 'admin' | 'superadmin';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'user' | 'admin' | 'superadmin';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'user' | 'admin' | 'superadmin';
          created_at?: string;
        };
      };
    };
  };
};