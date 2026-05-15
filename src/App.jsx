import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLayout from './components/layout/PageLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';
import IntroLandingPage from './pages/IntroLandingPage';

// Lazy loading pages
const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ToolDetailPage = lazy(() => import('./pages/ToolDetailPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));

function App() {
  const location = useLocation();
  const [introSeen, setIntroSeen] = useState(true);

  useEffect(() => {
    // Check if intro has been seen
    const seen = localStorage.getItem('intro_seen');
    if (seen !== 'true') {
      setIntroSeen(false);
    }
  }, []);

  // Scroll to top on every route change or when intro finishes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, introSeen]);

  if (!introSeen) {
    return <IntroLandingPage onComplete={() => setIntroSeen(true)} />;
  }

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner size="lg" /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/tool/:slug" element={<ToolDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Route>

            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            
            <Route path="/admin" element={<AdminPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PageLayout>
  );
}

export default App;
