// src/pages/StayOptionsPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Hotel, Home } from 'lucide-react';

const StayOptionsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('stayOptions')}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-8 text-center">
          If you are visiting Jaipur for our events or to meet a match, here are some recommended stay options near our office and event venues.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Hotel className="h-6 w-6 text-purple-600 mr-2" /> Hotels
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Hotel XYZ (Luxury)</strong>: Located 5 km from our office. Offers premium amenities and services.
                <br />
                <a href="https://www.example.com/hotelxyz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </li>
              <li>
                <strong>Hotel ABC (Mid-Range)</strong>: Just 2 km from the main event venue. Comfortable and affordable.
                <br />
                <a href="https://www.example.com/hotelabc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </li>
              <li>
                <strong>Guest House PQR (Budget)</strong>: A cozy and economical option within walking distance.
                <br />
                <a href="https://www.example.com/guesthousepqr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Home className="h-6 w-6 text-orange-600 mr-2" /> Guesthouses & Homestays
            </h2>
            <p className="text-gray-700 mb-2">
              For a more local experience, several guesthouses and homestays offer comfortable accommodations.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Jaipur Homestay Delight</strong>: Experience local hospitality.
                <br />
                <a href="https://www.example.com/jaipurhomestay" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </li>
              <li>
                <strong>Heritage Guest House</strong>: A traditional stay with modern comforts.
                <br />
                <a href="https://www.example.com/heritageguesthouse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed">
            We recommend booking your accommodation in advance, especially during peak seasons or event dates. Feel free to contact us if you need further assistance with your travel plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StayOptionsPage;

