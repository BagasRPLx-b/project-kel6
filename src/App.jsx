import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailGame from './pages/DetailGame';
function App() {
  return (
    <div>
      <div>
        <Routes>
          {/* Halaman utama */}
          <Route path="/" element={<Home />} />
          
          {/* Halaman detail game berdasarkan ID */}
          <Route path="/game/:id" element={<DetailGame />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
