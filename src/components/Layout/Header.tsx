import React, { useState } from "react"; // Import useState
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import kvmLogo from "../../assets/kvm-logo.png"; // Import the logo
import {
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  Crown,
  X,
} from "lucide-react"; // Import X for close icon

const Header: React.FC = () => {
  const { user, userRole, signOut } = useAuth();
  const { t, language, changeLanguage } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-amber-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

          <Link to="/" className="flex items-center space-x-2">
            <img
              src={kvmLogo}
              alt="Khandelwal Vikas Manch Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain drop-shadow"
            />
            <span className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
              {language === "hi" ? "खंडेलवाल परिणय" : "Khandelwal Parinay"}
            </span>
          </Link>

          {/* Navigation (Desktop) */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/profiles"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("profiles")}
              </Link>
              <Link
                to="/matches"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("matches")}
              </Link>
              <Link
                to="/interests"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("interests")}
              </Link>

              <Link
                to="/events"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("events")}
              </Link>
              {/* New Navigation Links */}
              <Link
                to="/about-us"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("aboutUs")}
              </Link>
              <Link
                to="/community-members"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("communityMembers")}
              </Link>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("gallery")}
              </Link>
              <Link
                to="/success-stories"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("successStories")}
              </Link>
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("contactUs")}
              </Link>
              {(userRole === "admin" || userRole === "superadmin") && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-amber-600 font-medium flex items-center space-x-1"
                >
                  <Crown className="h-4 w-4" />
                  <span>{t("admin")}</span>
                </Link>
              )}
            </nav>
          )}
          {!user && ( // Public navigation links for non-logged-in users
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("home")}
              </Link>
              <Link
                to="/about-us"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("aboutUs")}
              </Link>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("gallery")}
              </Link>
              <Link
                to="/success-stories"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("successStories")}
              </Link>
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                {t("contactUs")}
              </Link>
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded text-sm font-medium ${
                  language === "en"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className={`px-2 py-1 rounded text-sm font-medium ${
                  language === "hi"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                हि
              </button>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-amber-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-amber-600">
                    <User className="h-5 w-5" />
                    <span className="font-medium">
                      {user.email?.split("@")[0]}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t("profile")}
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t("settings")}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("logout")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 font-medium"
                >
                  {t("signup")}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-amber-600"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Full-screen overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center py-8 px-4 md:hidden animate-fade-in">
          <div className="w-full flex justify-end mb-8">
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-amber-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-lg">
            <Link
              to="/"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("home")}
            </Link>
            {user && (
              <>
                <Link
                  to="/profiles"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("profiles")}
                </Link>
                <Link
                  to="/matches"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("matches")}
                </Link>
                <Link
                  to="/interests"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("interests")}
                </Link>
                <Link
                  to="/events"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("events")}
                </Link>
              </>
            )}
            {/* New Mobile Navigation Links */}
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("aboutUs")}
            </Link>
            <Link
              to="/community-members"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("communityMembers")}
            </Link>
            <Link
              to="/sponsorship-donation"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("sponsorshipDonation")}
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("gallery")}
            </Link>
            <Link
              to="/success-stories"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("successStories")}
            </Link>
            <Link
              to="/how-to-reach"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("howToReach")}
            </Link>
            <Link
              to="/stay-options"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("stayOptions")}
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-amber-600 font-medium"
              onClick={closeMobileMenu}
            >
              {t("contactUs")}
            </Link>
            {user && (userRole === "admin" || userRole === "superadmin") && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-amber-600 font-medium flex items-center space-x-1"
                onClick={closeMobileMenu}
              >
                <Crown className="h-5 w-5" />
                <span>{t("admin")}</span>
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  <User className="h-5 w-5 inline-block mr-2" />
                  {t("profile")}
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  <Settings className="h-5 w-5 inline-block mr-2" />
                  {t("settings")}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMobileMenu();
                  }}
                  className="text-gray-700 hover:text-amber-600 font-medium text-left"
                >
                  <LogOut className="h-5 w-5 inline-block mr-2" />
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-amber-600 font-medium"
                  onClick={closeMobileMenu}
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 font-medium text-center"
                  onClick={closeMobileMenu}
                >
                  {t("signup")}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
