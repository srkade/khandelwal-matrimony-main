// src/pages/CommunityMembersPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const CommunityMembersPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('communityMembers')}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          This page is dedicated to showcasing the vibrant community of Khandelwal Matrimony. Here, you can learn more about the diverse backgrounds, professions, and interests of our members. We believe in fostering a strong sense of community and connection among Khandelwals worldwide.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our members come from various cities and states, bringing with them rich cultural experiences and family values. We encourage members to engage respectfully and build meaningful connections.
        </p>
        <p className="text-gray-700 leading-relaxed">
          (Content for displaying community statistics, member spotlights, or general information about the Khandelwal community will go here.)
        </p>
      </div>
    </div>
  );
};

export default CommunityMembersPage;

