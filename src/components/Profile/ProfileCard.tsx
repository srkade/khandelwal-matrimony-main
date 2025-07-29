import React from 'react';
import { Heart, MapPin, Briefcase, GraduationCap, Star, Eye, MessageCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Database } from '../../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileCardProps {
  profile: Profile;
  onExpressInterest: (profileId: string) => void;
  onAddToShortlist: (profileId: string) => void;
  onViewContact: (profileId: string) => void;
  showActions?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onExpressInterest,
  onAddToShortlist,
  onViewContact,
  showActions = true,
}) => {
  const { t } = useTranslation();

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

  const profileImage = profile.photo_gallery?.[0] || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Profile Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={profileImage}
          alt={`${profile.first_name} ${profile.last_name}`}
          className="w-full h-full object-cover"
        />
        {profile.is_premium && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Star className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">
            {profile.first_name} {profile.last_name}
          </h3>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm font-medium">
              {calculateAge(profile.date_of_birth)} years • {Math.round(profile.height / 12)}'{profile.height % 12}"
            </span>
            <span className="text-sm text-gray-500 capitalize">
              {profile.marital_status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-sm">{profile.city}, {profile.state}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <Briefcase className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{profile.profession}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <GraduationCap className="h-4 w-4 text-green-500" />
            <span className="text-sm">{profile.education}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Gotra:</span> {profile.gotra}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Manglik:</span> {profile.manglik}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => onExpressInterest(profile.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <Heart className="h-4 w-4" />
              <span>{t('expressInterest')}</span>
            </button>
            
            <button
              onClick={() => onAddToShortlist(profile.id)}
              className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <Star className="h-4 w-4" />
              <span>{t('addToShortlist')}</span>
            </button>
          </div>
        )}

        {showActions && (
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => onViewContact(profile.id)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              <span>{t('viewContact')}</span>
            </button>
            
            <button
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t('sendMessage')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;