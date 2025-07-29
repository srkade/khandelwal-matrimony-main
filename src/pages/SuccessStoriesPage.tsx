// src/pages/SuccessStoriesPage.tsx
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import s1 from '../assets/success-stories/s1.jpeg';
import s2 from '../assets/success-stories/s2.jpeg';
import s3 from '../assets/success-stories/s3.jpeg';
import s4 from '../assets/success-stories/s4.jpeg';
import s5 from '../assets/success-stories/s5.jpeg';
import s6 from '../assets/success-stories/s6.jpeg';
import s7 from '../assets/success-stories/s7.jpeg';
import s8 from '../assets/success-stories/s8.jpeg';
import s9 from '../assets/success-stories/s9.jpeg';
import s10 from '../assets/success-stories/s10.jpeg';
import s11 from '../assets/success-stories/s11.jpeg';
import s12 from '../assets/success-stories/s12.jpeg';





const images = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];

const SuccessStoriesPage: React.FC = () => {
  const { t, language } = useTranslation();

  const stories = [
    {
      name: language === 'hi' ? 'राज और प्रिया' : 'Raj & Priya',
      location: language === 'hi' ? 'जयपुर' : 'Jaipur',
      quote: language === 'hi' ? '"खंडेलवाल मैट्रिमनी के माध्यम से हमें अपना आदर्श जीवन साथी मिला। सेवा उत्कृष्ट थी!"' : '"We found our perfect match through Khandelwal Matrimony. The service was excellent and truly helped us connect!"',
      image: 'https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: language === 'hi' ? 'अमित और नेहा' : 'Amit & Neha',
      location: language === 'hi' ? 'दिल्ली' : 'Delhi',
      quote: language === 'hi' ? '"इस मंच ने हमें एक-दूसरे को खोजने में मदद की। हम बहुत आभारी हैं!"' : '"This platform helped us find each other. We are incredibly grateful!"',
      image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: language === 'hi' ? 'संजय और पूजा' : 'Sanjay & Pooja',
      location: language === 'hi' ? 'मुंबई' : 'Mumbai',
      quote: language === 'hi' ? '"सत्यापित प्रोफाइल और सुरक्षित वातावरण ने हमारी यात्रा को आसान बना दिया।"' : '"The verified profiles and secure environment made our journey easy."',
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? 'सफलता की कहानियां' : 'Success Stories'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'hi' 
                ? 'हमारे खुश जोड़ों की कहानियां'
                : 'Stories from our happy couples'}
            </p>
          </div>
          
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
  {images.map((img, index) => (
    <div
      key={index}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-border/30"
    >
      <img
        src={img}
        alt={`Success Story ${index + 1}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-center">
        <h4 className="font-semibold text-lg text-card-foreground">
          Couple {index + 1}
        </h4>
       
        <p className="text-sm text-primary font-medium">Married in 2023</p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;

