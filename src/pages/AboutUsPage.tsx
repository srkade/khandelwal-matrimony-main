// src/pages/AboutUsPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('aboutUs')}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to Khandelwal Matrimony, your trusted platform dedicated to helping individuals from the Khandelwal community find their life partners. Our mission is to provide a secure and reliable environment for eligible singles to connect, interact, and build lasting relationships based on shared values and cultural heritage.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Founded with the vision of simplifying the search for a compatible partner within the Khandelwal community, we leverage modern technology combined with traditional matchmaking values. We understand the importance of family, tradition, and community in the journey of marriage, and our platform is designed to honor these aspects.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our team is committed to ensuring the authenticity of profiles and providing a user-friendly experience. We continuously strive to enhance our services to meet the evolving needs of our members, making your search for a soulmate a joyful and successful one.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;

