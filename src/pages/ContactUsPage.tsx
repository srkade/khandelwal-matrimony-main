// src/pages/ContactUsPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Mail, Phone, MapPin, Clock, Users } from 'lucide-react';

const ContactUsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {t('contactUs')}
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-center text-lg font-semibold">
          अखिल भारतीय युवक-युवती परिचय सम्मेलन<br />
          All India Youth Introduction Event
        </p>

        <p className="text-center text-red-600 font-bold mb-8">
          📍 एलोरा, छ. संभाजीनगर (औरंगाबाद) | 📅 21-22 नवंबर 2025 (शुक्रवार, शनिवार)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Primary Contacts</h2>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>आशीष मेहता - 9881301308</li>
                  <li>मयूर बम्ब - 8329083798</li>
                  <li>निर्मल बढाया - 9422707879</li>
                  <li>नरेंद्र तांबी - 7588643994</li>
                  <li>किशोर खुटेटा - 9822116415</li>
                  <li>सुशील बम्ब - 9421475777</li>
                  <li>योगेश बम्ब - 9960345675</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Venue / स्थल</h2>
                <p className="text-gray-700">एलोरा, छ. संभाजीनगर (औरंगाबाद)</p>
                <p className="text-gray-600 text-sm">Please contact us for directions and accommodation details.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Dates / तिथियाँ</h2>
                <p className="text-gray-700">21 - 22 नवम्बर 2025</p>
                <p className="text-gray-700">Friday - Saturday</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">सहयोगी संस्था</h2>
                <p className="text-gray-700">खंडेलवाल महिला मंडल</p>
                <p className="text-gray-700">श्री बालाजी मंदिर ट्रस्ट</p>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full input"  />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full input"  />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" name="subject" className="mt-1 block w-full input" placeholder="Inquiry about the event" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full input" placeholder="Type your message here..."></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full py-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
