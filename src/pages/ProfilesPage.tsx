import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import ProfileCard from '../components/Profile/ProfileCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';

interface Profile {
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
}

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    ageMin: '',
    ageMax: '',
    heightMin: '',
    heightMax: '',
    city: '',
    state: '',
    education: '',
    profession: '',
    maritalStatus: '',
    manglik: '',
    excludeSameGotra: false,
  });

  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('verification_status', 'approved')
        .eq('is_active', true);

      // Exclude current user's profile
      if (user) {
        query = query.neq('user_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profiles');
      } else {
        setProfiles(data || []);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast.error('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleExpressInterest = async (profileId: string) => {
    if (!user) {
      toast.error('Please login to express interest');
      return;
    }

    try {
      const { error } = await supabase
        .from('interests')
        .insert({
          sender_id: user.id,
          receiver_id: profileId,
          status: 'pending',
        });

      if (error) {
        console.error('Error expressing interest:', error);
        toast.error('Failed to express interest');
      } else {
        toast.success('Interest expressed successfully!');
      }
    } catch (error) {
      console.error('Error expressing interest:', error);
      toast.error('Failed to express interest');
    }
  };

  const handleAddToShortlist = async (profileId: string) => {
    if (!user) {
      toast.error('Please login to add to shortlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('shortlists')
        .insert({
          user_id: user.id,
          profile_id: profileId,
        });

      if (error) {
        console.error('Error adding to shortlist:', error);
        toast.error('Failed to add to shortlist');
      } else {
        toast.success('Added to shortlist successfully!');
      }
    } catch (error) {
      console.error('Error adding to shortlist:', error);
      toast.error('Failed to add to shortlist');
    }
  };

  const handleViewContact = async (profileId: string) => {
    if (!user) {
      toast.error('Please login to view contact details');
      return;
    }

    // Here you would implement premium check and contact view logic
    toast.info('Contact viewing feature will be implemented with premium membership');
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchMatch = searchTerm === '' || 
      profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.profession.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('profiles')}</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>{t('filters')}</span>
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProfiles.length} profiles found
          </div>
        </div>

        {/* Filters Panel (when expanded) */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('gender')}
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('city')}
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t('city')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profession')}
                </label>
                <input
                  type="text"
                  value={filters.profession}
                  onChange={(e) => setFilters({...filters, profession: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t('profession')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('manglik')}
                </label>
                <select
                  value={filters.manglik}
                  onChange={(e) => setFilters({...filters, manglik: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="yes">{t('yes')}</option>
                  <option value="no">{t('no')}</option>
                  <option value="partial">{t('partial')}</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="excludeSameGotra"
                checked={filters.excludeSameGotra}
                onChange={(e) => setFilters({...filters, excludeSameGotra: e.target.checked})}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="excludeSameGotra" className="ml-2 text-sm text-gray-700">
                {t('excludeSameGotra')}
              </label>
            </div>
          </div>
        )}

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onExpressInterest={handleExpressInterest}
                onAddToShortlist={handleAddToShortlist}
                onViewContact={handleViewContact}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {searchTerm ? 'No profiles found matching your search.' : 'No profiles available.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilesPage;