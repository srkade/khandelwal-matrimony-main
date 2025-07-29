// src/pages/SponsorshipDonationPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const SponsorshipDonationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('sponsorshipDonation')}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Khandelwal Matrimony is committed to serving the community and continuously improving our platform. Your support through sponsorships and donations helps us maintain high-quality services, enhance security features, and reach more eligible Khandelwal singles globally.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every contribution, big or small, makes a significant difference in helping us achieve our mission. We offer various sponsorship opportunities for businesses and individuals who wish to support our cause.
        </p>
        <p className="text-gray-700 leading-relaxed">
          For more information on how you can contribute or become a sponsor, please contact us directly. Your generosity helps us unite more Khandelwal families.
        </p>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Donate</h2>
          <p className="text-gray-700 mb-2">Bank Transfer: [Bank Name], Account No: [Account Number], IFSC: [IFSC Code]</p>
          <p className="text-gray-700 mb-2">UPI ID: [YourUPIID]@bank</p>
          <p className="text-gray-700">For other methods or sponsorship inquiries, please contact us.</p>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipDonationPage;

