import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import kvmLogo from "../../assets/kvm-logo.png"; // Import the logo

const Footer: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
             <img
              src={kvmLogo}
              alt="Khandelwal Vikas Manch Logo"
              className="h-12 w-12 md:h-16 md:w-16 object-contain drop-shadow"
            />
              <span className="text-xl font-bold">
                 {language === "hi" ? "खंडेलवाल परिणय" : "Khandelwal Parinay"}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {language === 'hi' 
                ? 'खंडेलवाल समुदाय के लिए विश्वसनीय विवाह सेवा।' 
                : 'Trusted matrimonial service for Khandelwal community.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="text-gray-400 hover:text-white">{t('aboutUs')}</a></li>
              <li><a href="/community-members" className="text-gray-400 hover:text-white">{t('communityMembers')}</a></li>
              <li><a href="/sponsorship-donation" className="text-gray-400 hover:text-white">{t('sponsorshipDonation')}</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-white">{t('gallery')}</a></li>
              <li><a href="/success-stories" className="text-gray-400 hover:text-white">{t('successStories')}</a></li>
              <li><a href="/how-to-reach" className="text-gray-400 hover:text-white">{t('howToReach')}</a></li>
              <li><a href="/stay-options" className="text-gray-400 hover:text-white">{t('stayOptions')}</a></li>
              <li><a href="/contact-us" className="text-gray-400 hover:text-white">{t('contactUs')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'hi' ? 'सेवाएं' : 'Services'}
            </h3>
            <ul className="space-y-2">
              <li><a href="/profiles" className="text-gray-400 hover:text-white">{t('profiles')}</a></li>
              <li><a href="/matches" className="text-gray-400 hover:text-white">{t('matches')}</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white">{t('events')}</a></li>
              <li><a href="/premium" className="text-gray-400 hover:text-white">{t('premiumPlan')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Info'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="text-gray-400">Sumitdusad@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <span className="text-gray-400">+91-9225305647</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-gray-400">
                  {language === 'hi' ? 'एलोरा, छ. संभाजीनगर (औरंगाबाद)' : 'Ellora, Ch. Sambhajinagar (Aurangabad)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {language === 'hi' ? 'खंडेलवाल विवाह' : 'Khandelwal Matrimony'}. 
            {language === 'hi' ? ' सभी अधिकार सुरक्षित।' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

