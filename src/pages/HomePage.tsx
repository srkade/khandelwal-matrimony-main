import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "../hooks/useTranslation";
import {
  Heart,
  Users,
  Shield,
  Star,
  Search,
  Calendar,
  Award,
  CheckCircle,
  UserPlus,
  MessageSquare,
  Handshake,
} from "lucide-react";
import s1 from "../assets/success-stories/s1.jpeg";
import s2 from "../assets/success-stories/s2.jpeg";
import s3 from "../assets/success-stories/s3.jpeg";
import s4 from "../assets/success-stories/s4.jpeg";
import s5 from "../assets/success-stories/s5.jpeg";
import s6 from "../assets/success-stories/s6.jpeg";
import s7 from "../assets/success-stories/s7.jpeg";
import s8 from "../assets/success-stories/s8.jpeg";
import s9 from "../assets/success-stories/s9.jpeg";
import s10 from "../assets/success-stories/s10.jpeg";
import s11 from "../assets/success-stories/s11.jpeg";
import s12 from "../assets/success-stories/s12.jpeg";
import members from "../assets/members.jpg";

const images = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useTranslation();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: language === "hi" ? "समुदाय-विशिष्ट" : "Community-Specific",
      description:
        language === "hi"
          ? "खंडेलवाल समुदाय के लिए विशेष रूप से डिज़ाइन किया गया"
          : "Designed exclusively for Khandelwal community",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: language === "hi" ? "सुरक्षित और भरोसेमंद" : "Safe & Trusted",
      description:
        language === "hi"
          ? "सत्यापित प्रोफाइल और सुरक्षित मैचमेकिंग"
          : "Verified profiles with secure matchmaking",
    },
    {
      icon: <Search className="h-8 w-8 text-green-500" />,
      title: language === "hi" ? "उन्नत खोज" : "Advanced Search",
      description:
        language === "hi"
          ? "गोत्र, मांगलिक और अन्य प्राथमिकताओं के साथ फिल्टर"
          : "Filter with Gotra, Manglik and other preferences",
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-500" />,
      title: language === "hi" ? "समुदायिक कार्यक्रम" : "Community Events",
      description:
        language === "hi"
          ? "समुदायिक मिलन और सांस्कृतिक कार्यक्रम"
          : "Community meetups and cultural events",
    },
  ];

  const howItWorksSteps = [
    {
      icon: <UserPlus className="h-10 w-10 text-amber-600" />,
      title: language === "hi" ? "प्रोफाइल बनाएं" : "Create Your Profile",
      description:
        language === "hi"
          ? "अपनी जानकारी और प्राथमिकताओं के साथ एक विस्तृत प्रोफाइल बनाएं।"
          : "Build a detailed profile with your information and preferences.",
    },
    {
      icon: <Search className="h-10 w-10 text-amber-600" />,
      title: language === "hi" ? "मैच खोजें" : "Find Your Match",
      description:
        language === "hi"
          ? "उन्नत फिल्टर का उपयोग करके हजारों सत्यापित प्रोफाइल ब्राउज़ करें।"
          : "Browse thousands of verified profiles using advanced filters.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-amber-600" />,
      title: language === "hi" ? "जुड़ें और मिलें" : "Connect & Meet",
      description:
        language === "hi"
          ? "रुचि व्यक्त करें, संदेश भेजें और अपने संभावित जीवन साथी से मिलें।"
          : "Express interest, send messages, and meet your potential life partner.",
    },
  ];

  const stats = [
    {
      number: "10,000+",
      label: language === "hi" ? "सत्यापित प्रोफाइल" : "Verified Profiles",
    },
    {
      number: "2,500+",
      label: language === "hi" ? "सफल मैच" : "Successful Matches",
    },
    { number: "50+", label: language === "hi" ? "शहर" : "Cities" },
    {
      number: "15+",
      label: language === "hi" ? "वर्षों का अनुभव" : "Years of Experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {" "}
        {/* Increased padding */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?_gl=1*voj8qw*_ga*MTA1NDQ0NDIwNi4xNzUzNTQxOTAz*_ga_8JE65Q40S6*czE3NTM1NDE5MDIkbzEkZzEkdDE3NTM1NDE5NDYkajE2JGwwJGgw"
            alt="Happy Couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Overlay */}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
              <div className="flex-1 text-center">
                <div className="text-sm md:text-base">श्री गणेशाय नमः॥</div>
                <div className="text-sm md:text-base font-medium">
                  जय श्री सुंदर दासजी की
                </div>
                <div className="font-bold text-xl md:text-3xl leading-tight mt-2">
                  अ.भा. खंडेलवाल वैश्य युवक-युवती
                  <br />
                  <span className="text-2xl md:text-4xl block">
                    परिचय सम्मेलन
                  </span>
                </div>
                <div className="mt-1 text-xs md:text-base font-semibold tracking-wide">
                  एलोरा, छ. संभाजीनगर (औरंगाबाद)
                </div>
                <div className="text-xl md:text-base font-semibold py-8">
                  दिनांक: २१-२२ नवम्बर २०२५, शुक्रवार - शनिवार
                </div>
              </div>
              <div className="flex items-center space-x-4 align-center justify-center mt-6">
                <Link
                  to="/login"
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 font-medium"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 font-medium"
                >
                  {t("Register")}
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              {/* Image is now background, this div can be used for other elements or removed */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      {/* <section className="py-20 bg-gradient-to-br from-amber-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'hi' 
                ? 'अपना आदर्श जीवन साथी खोजने के लिए सरल कदम'
                : 'Simple steps to find your ideal life partner'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="text-center mb-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === "hi" ? "सफलता की कहानियां" : "Committee Members"}
            </h2>
          </div>
          <img src={members} alt="" />
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === "hi" ? "सफलता की कहानियां" : "Success Stories"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "hi"
                ? "हमारे खुश जोड़ों की कहानियां"
                : "Stories from our happy couples"}
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

                  <p className="text-sm text-primary font-medium">
                    Married in 2023
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {language === "hi"
              ? "आज ही अपनी खोज शुरू करें"
              : "Start Your Journey Today"}
          </h2>
          <p className="text-xl text-white mb-8">
            {language === "hi"
              ? "हजारों सत्यापित प्रोफाइल में से अपना जीवनसाथी खोजें"
              : "Join thousands of verified profiles and find your life partner"}
          </p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-200 font-semibold text-lg shadow-lg"
            >
              {language === "hi" ? "मुफ्त में शुरू करें" : "Get Started Free"}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
