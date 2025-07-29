// src/pages/HowToReachPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { MapPin, Train, Plane, Car } from 'lucide-react';

const HowToReachPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('howToReach')}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-8 text-center">
          Planning to visit our office or attend an event? Here's how you can reach us.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <MapPin className="h-6 w-6 text-red-600 mr-2" /> Our Office Location
            </h2>
            <p className="text-gray-700 mb-2">Khandelwal Matrimony Headquarters</p>
            <p className="text-gray-700 mb-2">123, Matrimony Lane, Khandelwal Nagar,</p>
            <p className="text-gray-700 mb-4">Jaipur, Rajasthan - 302001, India</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.1000000000004!2d75.82000000000001!3d26.890000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Plane className="h-6 w-6 text-blue-600 mr-2" /> By Air
            </h2>
            <p className="text-gray-700 mb-2">
              The nearest airport is Jaipur International Airport (JAI). From the airport, our office is approximately 30 minutes by taxi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Train className="h-6 w-6 text-green-600 mr-2" /> By Train
            </h2>
            <p className="text-gray-700 mb-2">
              Jaipur Junction (JP) is the main railway station. Our office is about 15 minutes from the railway station by auto-rickshaw or taxi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Car className="h-6 w-6 text-amber-600 mr-2" /> By Road
            </h2>
            <p className="text-gray-700 mb-2">
              Jaipur is well-connected by national highways. You can reach us by private car, bus, or taxi from major cities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToReachPage;

