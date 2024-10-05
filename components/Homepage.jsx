import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";
import data from '../data.json';
import slideshowImage1 from "../img/HomePage/Slide1.png";
import slideshowImage2 from "../img/HomePage/Slide2.png";
import slideshowImage3 from "../img/HomePage/Slide3.png";
import slideshowImage4 from "../img/HomePage/Slide4.png"; 
import slideshowImage5 from "../img/HomePage/Slide5.png"; 
function Homepage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowImages = [
    slideshowImage1,
    slideshowImage2,
    slideshowImage3,
    slideshowImage4,
    slideshowImage5 
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setVisitorCount((prevCount) => prevCount + 1);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearInterval(slideInterval);
    };
  }, []);

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

  const filteredNewCars = data.newCars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 15);

  const filteredUsedCars = data.usedCars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 15);

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
          <img src={icon} alt="Visitors" />
          <span className="visitor-count">{visitorCount}</span>
        </div>
      </header>

      <main>
        <section className="slideshow">
          <div className="slideshow-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slideshowImages.map((image, index) => (
              <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="button-container">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                className={`round-button ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </section>

        <section className="search-bar">
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => console.log("Search clicked")}>Search</button>
        </section>

        <section className="car-listings">
          <h2>Featured New Cars</h2>
          <div className="car-grid">
            {filteredNewCars.map(car => (
              <div className="car-item" key={car.id}>
                <img src={car.image} alt={car.model} />
                <div className="car-details">
                  <h3>{car.model}</h3>
                  <p>{car.type}</p>
                  <p>${car.price}</p>
                  <Link to={`/car/${car.id}`} className="view-details">View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <h2>Featured Used Cars</h2>
          <div className="car-grid">
            {filteredUsedCars.map(car => (
              <div className="car-item" key={car.id}>
                <img src={car.image} alt={car.model} />
                <div className="car-details">
                  <h3>{car.model}</h3>
                  <p>{car.type}</p>
                  <p>${car.price}</p>
                  <Link to={`/car/${car.id}`} className="view-details">View Details</Link>
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

export default Homepage;
