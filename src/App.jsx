import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailGame from './pages/DetailGame';
import PublisherDetail from './pages/PublisherDetail'; // Import PublisherDetail component
import StoresPage from './pages/StorePages';
import AboutUsPage from './pages/AboutUs';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <div>
      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={<Home />} />

        {/* Halaman detail game berdasarkan ID */}
        <Route path="/game/:id" element={<DetailGame />} />

        {/* Halaman detail publisher berdasarkan ID */}
        <Route path="/publisher/:id" element={<PublisherDetail />} /> {/* Add the route for publisher */}
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/about" element={<AboutUsPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
