// src/App.tsx
import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import ProfilesPage from './pages/ProfilesPage';
import ProfilePage from './pages/ProfilePage';
import CreateProfilePage from './pages/CreateProfilePage'; // Add this import
import AboutUsPage from './pages/AboutUsPage'; // New
import CommunityMembersPage from './pages/CommunityMembersPage'; // New
import SponsorshipDonationPage from './pages/SponsorshipDonationPage'; // New
import GalleryPage from './pages/GalleryPage'; // New
import SuccessStoriesPage from './pages/SuccessStoriesPage'; // New
import HowToReachPage from './pages/HowToReachPage'; // New
import StayOptionsPage from './pages/StayOptionsPage'; // New
import ContactUsPage from './pages/ContactUsPage'; // New


const queryClient = new QueryClient();

function App() {
  // Add this useEffect for network test
  useEffect(() => {
    const testNetwork = async () => {
      console.log('App.tsx: Initiating network test...');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log('App.tsx: Network test successful. Data:', data);
      } catch (error) {
        console.error('App.tsx: Network test failed:', error);
      }
    };
    testNetwork();
  }, []); // Run once on mount

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />

              {/* Layout Routes */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profiles" element={
                      <ProtectedRoute requireAuth={true}>
                        <ProfilesPage />
                      </ProtectedRoute>
                    } />

                    {/* New Public Pages */}
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/community-members" element={<CommunityMembersPage />} />
                    <Route path="/sponsorship-donation" element={<SponsorshipDonationPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/success-stories" element={<SuccessStoriesPage />} />
                    <Route path="/how-to-reach" element={<HowToReachPage />} />
                    <Route path="/stay-options" element={<StayOptionsPage />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />


                    {/* Protected Routes */}
                    <Route path="/matches" element={
                      <ProtectedRoute>
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Matches Page</h1>
                            <p className="text-gray-600">Coming soon...</p>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />

                    <Route path="/interests" element={
                      <ProtectedRoute>
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Interests Page</h1>
                            <p className="text-gray-600">Coming soon...</p>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />

                    <Route path="/events" element={
                      <ProtectedRoute>
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Events Page</h1>
                            <p className="text-gray-600">Coming soon...</p>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />

                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage /> {/* Use the new ProfilePage component here */}
                      </ProtectedRoute>
                    } />
                    {/* Add this new route for profile creation */}
                    <Route path="/profile/create" element={
                      <ProtectedRoute>
                        <CreateProfilePage /> {/* This will be your new component */}
                      </ProtectedRoute>
                    } />

                    <Route path="/admin" element={
                      <ProtectedRoute requiredRole="admin">
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                            <p className="text-gray-600">Coming soon...</p>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              } />
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

