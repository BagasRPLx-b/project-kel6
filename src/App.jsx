import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailGame from './pages/DetailGame';
import PublisherDetail from './pages/PublisherDetail'; // Import PublisherDetail component

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
      </Routes>
    </div>
  );
}

export default App;
