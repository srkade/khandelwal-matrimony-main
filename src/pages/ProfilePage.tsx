// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Database } from '../lib/supabase';
import { useTranslation } from '../hooks/useTranslation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Add this import
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Clock, Heart, Ruler, BookOpen, DollarSign, Users, Home, Building2, CheckCircle, XCircle, Loader2 } from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];

const ProfilePage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate(); // Add this line
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // --- IMPORTANT: Check these console.log outputs ---
      console.log('ProfilePage useEffect: authLoading =', authLoading, 'user =', user);
      // ---

      if (authLoading) {
        console.log('ProfilePage: authLoading is true, returning early.');
        return; // Wait for auth to load
      }

      if (!user) {
        console.log('ProfilePage: user is null, setting error and returning.');
        setLoading(false);
        setError('User not logged in.');
        toast.error('Please log in to view your profile.');
        return;
      }

      try {
        console.log('ProfilePage: Attempting to fetch profile for user ID:', user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Profile not found. Please complete your profile registration.');
            toast.info('Your profile is not yet complete. Please create it.');
          } else {
            setError(error.message);
            toast.error(`Error fetching profile: ${error.message}`);
          }
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching profile:', err);
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred while fetching your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, t]);

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {error.includes('Profile not found') && (
            <button
              onClick={() => navigate('/profile/create')} // Change this line
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-200 font-medium"
            >
              Create Your Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-4">It looks like you haven't created your profile yet.</p>
          <button
            onClick={() => navigate('/profile/create')} // Change this line
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-200 font-medium"
          >
            Create Your Profile
          </button>
        </div>
      </div>
    );
  }

  const profileImage = profile.photo_gallery?.[0] || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${profileImage})` }}>
          <div className="absolute inset-0 bg-black/50 flex items-end p-6">
            <div className="flex items-center space-x-4">
              <img
                src={profileImage}
                alt={`${profile.first_name} ${profile.last_name}`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="text-amber-200 text-lg">{profile.profession}</p>
              </div>
            </div>
          </div>
          {profile.is_premium && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>Premium Member</span>
            </div>
          )}
          <button
            onClick={() => toast.info('Edit profile functionality coming soon!')}
            className="absolute top-4 left-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 text-sm font-medium"
          >
            {t('editProfile')}
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-500" />
                <span>{profile.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>{profile.city}, {profile.state}</span>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-500" />
                <span>{t('gender')}: {t(profile.gender)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>{t('dateOfBirth')}: {profile.date_of_birth} ({calculateAge(profile.date_of_birth)} {t('years')})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>{t('birthTime')}: {profile.birth_time || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>{t('birthPlace')}: {profile.birth_place}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-blue-500" />
                <span>{t('maritalStatus')}: {t(profile.marital_status)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="h-5 w-5 text-blue-500" />
                <span>{t('height')}: {Math.floor(profile.height / 12)}'{profile.height % 12}"</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <span>{t('religion')}: {profile.religion}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span>{t('manglik')}: {t(profile.manglik)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-blue-500" />
                <span>{t('gotra')}: {profile.gotra}</span>
              </div>
            </div>
          </div>

          {/* Professional & Educational Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional & Educational Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-green-500" />
                <span>{t('education')}: {profile.education}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-green-500" />
                <span>{t('profession')}: {profile.profession}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>{t('income')}: {profile.income}</span>
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Family Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>{t('fatherName')}: {profile.father_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>{t('motherName')}: {profile.mother_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-purple-500" />
                <span>{t('fatherOccupation')}: {profile.father_occupation}</span>
              </div>
              <div className="flex items-center space-x-2 col-span-full">
                <Users className="h-5 w-5 text-purple-500" />
                <span>{t('siblings')}: {profile.siblings}</span>
              </div>
            </div>
          </div>

          {/* Partner Expectations */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Partner Expectations</h3>
            <p className="text-gray-700">{profile.expectations}</p>
          </div>

          {/* Verification Status */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Verification Status</h3>
            <div className="flex items-center space-x-2 text-gray-700">
              {profile.verification_status === 'approved' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="capitalize">{profile.verification_status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
