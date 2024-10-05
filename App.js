import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import NewCars from './components/NewCars';
import UsedCars from './components/UsedCars';
import AboutUs from './components/AboutUs';
import CarDetail from './components/CarDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/NewCars.jsx" element={<NewCars />} />
        <Route path="/UsedCars.jsx" element={<UsedCars />} />
        <Route path="/AboutUs.jsx" element={<AboutUs />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
