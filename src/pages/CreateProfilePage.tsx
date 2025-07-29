// src/pages/CreateProfilePage.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { supabase } from '../lib/supabase'; // Ensure supabase client is imported
import axios from 'axios'; // For file uploads to your backend

import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Clock, Heart, Ruler, BookOpen, DollarSign, Users, Home, Building2, Upload, Loader2
} from 'lucide-react';

// Define the shape of your form data
interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  gotra?: string; // Made optional
  date_of_birth?: string; // Made optional
  birth_time?: string;
  birth_place?: string; // Made optional
  education?: string; // Made optional
  profession?: string; // Made optional
  income?: string; // Made optional
  marital_status?: 'never_married' | 'divorced' | 'widowed'; // Made optional
  height?: number; // Made optional
  religion?: string; // Made optional
  manglik?: 'yes' | 'no' | 'partial'; // Made optional
  horoscope_file?: FileList; // For file input
  profile_photo_file?: FileList; // For file input
  father_name?: string; // Made optional
  mother_name?: string; // Made optional
  siblings?: string; // Made optional
  father_occupation?: string; // Made optional
  expectations?: string; // Made optional
  city?: string; // Made optional
  state?: string; // Made optional
}

const CreateProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth(); // Destructure session here
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema using yup
  const schema = yup.object().shape({
    first_name: yup.string().required(t('required')),
    last_name: yup.string().required(t('required')),
    phone: yup.string().optional(),
    gender: yup.string().oneOf(['male', 'female', 'other']).required(t('required')),
    gotra: yup.string().optional(), // Changed to optional
    date_of_birth: yup.date().optional().nullable().transform((curr, orig) => orig === '' ? null : curr).max(new Date(), 'Date of birth cannot be in the future'), // Changed to optional
    birth_time: yup.string().optional(),
    birth_place: yup.string().optional(), // Changed to optional
    education: yup.string().optional(), // Changed to optional
    profession: yup.string().optional(), // Changed to optional
    income: yup.string().optional(), // Changed to optional
    marital_status: yup.string().oneOf(['never_married', 'divorced', 'widowed']).optional(), // Changed to optional
    height: yup.number().typeError('Height must be a number').optional().min(1, 'Height must be greater than 0').nullable().transform((curr, orig) => orig === '' ? null : curr), // Changed to optional
    religion: yup.string().optional(), // Changed to optional
    manglik: yup.string().oneOf(['yes', 'no', 'partial']).optional(), // Changed to optional
    horoscope_file: yup.mixed().optional()
      .test('fileSize', 'File too large (max 5MB)', (value) => !value || !value[0] || (value as FileList)[0]?.size <= 5 * 1024 * 1024)
      .test('fileType', 'Invalid file type (PDF, JPG, PNG, WEBP)', (value) => !value || !value[0] || ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes((value as FileList)[0]?.type)),
    profile_photo_file: yup.mixed().optional()
      .test('fileSize', 'File too large (max 5MB)', (value) => !value || !value[0] || (value as FileList)[0]?.size <= 5 * 1024 * 1024)
      .test('fileType', 'Invalid file type (JPG, PNG, WEBP)', (value) => !value || !value[0] || ['image/jpeg', 'image/png', 'image/webp'].includes((value as FileList)[0]?.type)),
    father_name: yup.string().optional(), // Changed to optional
    mother_name: yup.string().optional(), // Changed to optional
    siblings: yup.string().optional(), // Changed to optional
    father_occupation: yup.string().optional(), // Changed to optional
    expectations: yup.string().optional(), // Changed to optional
    city: yup.string().optional(), // Changed to optional
    state: yup.string().optional(), // Changed to optional
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
  });

  const selectedGender = watch('gender');
  const selectedMaritalStatus = watch('marital_status');
  const selectedManglik = watch('manglik');

  const onSubmit = async (data: ProfileFormData) => {
    if (authLoading || !user || !session) { // Check for session existence
      toast.error('User not authenticated or session not found. Please log in.');
      return;
    }

    setIsSubmitting(true);
    let profilePhotoUrl: string | null = null;
    let horoscopeUrl: string | null = null;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Add this line

    console.log('Frontend API_BASE_URL:', API_BASE_URL);


    try {
      // 1. Upload Profile Photo
      if (data.profile_photo_file && data.profile_photo_file.length > 0 && data.profile_photo_file[0]) {
        const formData = new FormData();
        formData.append('profilePhoto', data.profile_photo_file[0]);
        const response = await axios.post(`${API_BASE_URL}/api/upload/profile-photo`, formData, { // Modified line
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session.access_token}`
          },
        });
        profilePhotoUrl = response.data.url;
        toast.success('Profile photo uploaded successfully!');
      }

      // 2. Upload Horoscope
      if (data.horoscope_file && data.horoscope_file.length > 0 && data.horoscope_file[0]) {
        const formData = new FormData();
        formData.append('horoscopeFile', data.horoscope_file[0]);
        const response = await axios.post(`${API_BASE_URL}/api/upload/horoscope`, formData, { // Modified line
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session.access_token}`
          },
        });
        horoscopeUrl = response.data.url;
        toast.success('Horoscope uploaded successfully!');
      }

      // 3. Prepare profile data for Supabase
      const profileData = {
        user_id: user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: user.email, // Use email from authenticated user
        phone: data.phone || null,
        gender: data.gender,
        gotra: data.gotra || null, // Ensure null for optional fields if empty
        date_of_birth: data.date_of_birth || null,
        birth_time: data.birth_time || null,
        birth_place: data.birth_place || null,
        education: data.education || null,
        profession: data.profession || null,
        income: data.income || null,
        marital_status: data.marital_status || null,
        height: data.height || null,
        religion: data.religion || null,
        manglik: data.manglik || null,
        horoscope_url: horoscopeUrl,
        photo_gallery: profilePhotoUrl ? [profilePhotoUrl] : [], // Store as array
        father_name: data.father_name || null,
        mother_name: data.mother_name || null,
        siblings: data.siblings || null,
        father_occupation: data.father_occupation || null,
        expectations: data.expectations || null,
        city: data.city || null,
        state: data.state || null,
        // verification_status, is_active, is_premium, created_at, updated_at are handled by DB defaults
      };

      // 4. Insert profile data into Supabase via your backend API
      const response = await axios.post(`${API_BASE_URL}/api/profiles`, profileData, { // Modified line
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
      });

      if (response.status === 201) {
        toast.success('Profile created successfully! It is now pending verification.');
        navigate('/profile'); // Redirect to the user's profile page
      } else {
        toast.error(response.data.error || 'Failed to create profile.');
      }

    } catch (error: any) {
      console.error('Profile creation error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Backend response data:', error.response.data);
        toast.error(error.response.data.error || 'An error occurred during profile creation.');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('createAccount')}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {t('createAccount')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="first_name" className="label">{t('firstName')}</label>
              <input id="first_name" type="text" {...register('first_name')} className="input" />
              {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
            </div>
            <div>
              <label htmlFor="last_name" className="label">{t('lastName')}</label>
              <input id="last_name" type="text" {...register('last_name')} className="input" />
              {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="label">{t('phone')} ({t('optional')})</label>
              <input id="phone" type="text" {...register('phone')} className="input" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="label">{t('gender')}</label>
              <select id="gender" {...register('gender')} className="input" value={selectedGender}>
                <option value="">{t('selectGender')}</option>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
                <option value="other">{t('other')}</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>
            <div>
              <label htmlFor="date_of_birth" className="label">{t('dateOfBirth')} ({t('optional')})</label>
              <input id="date_of_birth" type="date" {...register('date_of_birth')} className="input" />
              {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth.message}</p>}
            </div>
            <div>
              <label htmlFor="birth_time" className="label">{t('birthTime')} ({t('optional')})</label>
              <input id="birth_time" type="time" {...register('birth_time')} className="input" />
              {errors.birth_time && <p className="text-red-500 text-sm mt-1">{errors.birth_time.message}</p>}
            </div>
            <div>
              <label htmlFor="birth_place" className="label">{t('birthPlace')} ({t('optional')})</label>
              <input id="birth_place" type="text" {...register('birth_place')} className="input" />
              {errors.birth_place && <p className="text-red-500 text-sm mt-1">{errors.birth_place.message}</p>}
            </div>
            <div>
              <label htmlFor="gotra" className="label">{t('gotra')} ({t('optional')})</label>
              <input id="gotra" type="text" {...register('gotra')} className="input" />
              {errors.gotra && <p className="text-red-500 text-sm mt-1">{errors.gotra.message}</p>}
            </div>
            <div>
              <label htmlFor="marital_status" className="label">{t('maritalStatus')} ({t('optional')})</label>
              <select id="marital_status" {...register('marital_status')} className="input" value={selectedMaritalStatus}>
                <option value="">{t('selectMaritalStatus')}</option>
                <option value="never_married">{t('neverMarried')}</option>
                <option value="divorced">{t('divorced')}</option>
                <option value="widowed">{t('widowed')}</option>
              </select>
              {errors.marital_status && <p className="text-red-500 text-sm mt-1">{errors.marital_status.message}</p>}
            </div>
            <div>
              <label htmlFor="height" className="label">{t('height')} (in inches) ({t('optional')})</label>
              <input id="height" type="number" {...register('height')} className="input" placeholder="e.g., 68 for 5'8'" />
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
            </div>
            <div>
              <label htmlFor="religion" className="label">{t('religion')} ({t('optional')})</label>
              <input id="religion" type="text" {...register('religion')} className="input" />
              {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion.message}</p>}
            </div>
            <div>
              <label htmlFor="manglik" className="label">{t('manglik')} ({t('optional')})</label>
              <select id="manglik" {...register('manglik')} className="input" value={selectedManglik}>
                <option value="">{t('selectManglikStatus')}</option>
                <option value="yes">{t('yes')}</option>
                <option value="no">{t('no')}</option>
                <option value="partial">{t('partial')}</option>
              </select>
              {errors.manglik && <p className="text-red-500 text-sm mt-1">{errors.manglik.message}</p>}
            </div>
            <div>
              <label htmlFor="city" className="label">{t('city')} ({t('optional')})</label>
              <input id="city" type="text" {...register('city')} className="input" />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label htmlFor="state" className="label">{t('state')} ({t('optional')})</label>
              <input id="state" type="text" {...register('state')} className="input" />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
            </div>
          </div>

          {/* Professional & Educational Details */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('professionalEducationalDetails')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="education" className="label">{t('education')} ({t('optional')})</label>
              <input id="education" type="text" {...register('education')} className="input" />
              {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>}
            </div>
            <div>
              <label htmlFor="profession" className="label">{t('profession')} ({t('optional')})</label>
              <input id="profession" type="text" {...register('profession')} className="input" />
              {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>}
            </div>
            <div>
              <label htmlFor="income" className="label">{t('income')} ({t('optional')})</label>
              <input id="income" type="text" {...register('income')} className="input" />
              {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>}
            </div>
          </div>

          {/* Family Details */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('familyDetails')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="father_name" className="label">{t('fatherName')} ({t('optional')})</label>
              <input id="father_name" type="text" {...register('father_name')} className="input" />
              {errors.father_name && <p className="text-red-500 text-sm mt-1">{errors.father_name.message}</p>}
            </div>
            <div>
              <label htmlFor="mother_name" className="label">{t('motherName')} ({t('optional')})</label>
              <input id="mother_name" type="text" {...register('mother_name')} className="input" />
              {errors.mother_name && <p className="text-red-500 text-sm mt-1">{errors.mother_name.message}</p>}
            </div>
            <div>
              <label htmlFor="siblings" className="label">{t('siblings')} ({t('optional')})</label>
              <input id="siblings" type="text" {...register('siblings')} className="input" />
              {errors.siblings && <p className="text-red-500 text-sm mt-1">{errors.siblings.message}</p>}
            </div>
            <div>
              <label htmlFor="father_occupation" className="label">{t('fatherOccupation')} ({t('optional')})</label>
              <input id="father_occupation" type="text" {...register('father_occupation')} className="input" />
              {errors.father_occupation && <p className="text-red-500 text-sm mt-1">{errors.father_occupation.message}</p>}
            </div>
          </div>

          {/* Partner Expectations */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('partnerExpectations')}</h2>
          <div>
            <label htmlFor="expectations" className="label">{t('expectations')} ({t('optional')})</label>
            <textarea id="expectations" {...register('expectations')} className="input min-h-[100px]"></textarea>
            {errors.expectations && <p className="text-red-500 text-sm mt-1">{errors.expectations.message}</p>}
          </div>

          {/* File Uploads */}
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('uploads')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="profile_photo_file" className="label flex items-center space-x-2">
                <Upload className="h-5 w-5" />
               <span>{t('uploadPhoto')} - {t('optional')}</span>
              </label>
             <input
               id="profile_photo_file"
               type="file"
               accept="image/jpeg,image/png,image/webp"
               {...register('profile_photo_file')}
               className="input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
             />
             <p className="text-sm text-gray-500 mt-1">Upload your profile photo (JPG, PNG, WEBP - Max 5MB)</p>
              {errors.profile_photo_file && <p className="text-red-500 text-sm mt-1">{errors.profile_photo_file.message}</p>}
            </div>
            <div>
              <label htmlFor="horoscope_file" className="label flex items-center space-x-2">
                <Upload className="h-5 w-5" />
               <span>{t('uploadHoroscope')} - {t('optional')}</span>
              </label>
             <input
               id="horoscope_file"
               type="file"
               accept="application/pdf,image/jpeg,image/png,image/webp"
               {...register('horoscope_file')}
               className="input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
             />
             <p className="text-sm text-gray-500 mt-1">Upload your horoscope (PDF, JPG, PNG, WEBP - Max 5MB)</p>
              {errors.horoscope_file && <p className="text-red-500 text-sm mt-1">{errors.horoscope_file.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-3 text-lg flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {t('submitting')}
              </>
            ) : (
              t('submit')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;