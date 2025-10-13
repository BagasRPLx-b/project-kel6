import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import DetailGame from './pages/DetailGame';
import PublisherDetail from './pages/PublisherDetail';
import StoresPage from './pages/StorePages';
import AboutUsPage from './pages/AboutUs';
import ProfilePage from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuth = () => {
    const currentUser = localStorage.getItem("currentUser");
    console.log('Auth check:', !!currentUser); // Debug log
    setIsAuthenticated(!!currentUser);
    setLoading(false);
    return !!currentUser;
  };

  useEffect(() => {
    // Initialize storage
    if (!localStorage.getItem("userComments")) {
      localStorage.setItem("userComments", JSON.stringify([]));
    }
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    // Check auth on app start
    checkAuth();

    // Check dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Function to handle login (will be passed to Login component)
  const handleLogin = () => {
    console.log('Login successful, updating auth state...');
    checkAuth();
    navigate('/');
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={darkMode ? 'dark' : ''}>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/game/:id" element={<DetailGame onLogout={handleLogout} />} />
              <Route path="/publisher/:id" element={<PublisherDetail onLogout={handleLogout} />} />
              <Route path="/stores" element={<StoresPage onLogout={handleLogout} />} />
              <Route path="/about" element={<AboutUsPage onLogout={handleLogout} />} />
              <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;