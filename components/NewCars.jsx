import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";
import data from '../data.json';

function NewCars() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setVisitorCount((prevCount) => prevCount + 1);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredNewCars = data.newCars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formattedTime = currentTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Logo" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/NewCars.jsx">New</Link></li>
            <li><Link to="/UsedCars.jsx">Used</Link></li>
            <li><Link to="/AboutUs.jsx">About Us</Link></li>
          </ul>
        </nav>
        <div className="visitor-icon">
          <img src={icon} alt="Visitors" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
          <span className="visitor-count">{visitorCount}</span>
        </div>
      </header>

      <main>
        <section className="search-bar">
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => console.log("Search clicked")}>Search</button>
        </section>

        <section className="new-cars">
          <h2>Available New Cars</h2>
          <div className="car-grid">
            {filteredNewCars.map(car => (
              <div className="car-item" key={car.id}>
                <img src={car.image} alt={car.model} />
                <p>{car.model}</p>
                <div className="car-buttons">
                  <Link to={`/car/${car.id}`} className="car-button">Show Details</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <footer>
        <p>{formattedTime}</p>
      </footer>
    </div>
  );
}

export default NewCars;
