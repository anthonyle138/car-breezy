import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

function CarDetail() {
  const { id } = useParams();
  const car = data.newCars.concat(data.usedCars).find(car => car.id === parseInt(id));


  const [visitorCount, setVisitorCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentShowcaseSlide, setCurrentShowcaseSlide] = useState(0);
  const [currentInteriorSlide, setCurrentInteriorSlide] = useState(0);

  useEffect(() => {
    setVisitorCount(prevCount => prevCount + 1);

   
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    
    const showcaseIntervalId = setInterval(() => {
      setCurrentShowcaseSlide(prev => (prev + 1) % car.showcaseImages.length);
    }, 2000);

   
    const interiorIntervalId = setInterval(() => {
      setCurrentInteriorSlide(prev => (prev + 1) % interiorImages.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearInterval(showcaseIntervalId);
      clearInterval(interiorIntervalId);
    };
  }, [car]);

  if (!car) {
    return <div>Car not found!</div>;
  }

  const interiorImages = Array.isArray(car.interiorImage) ? car.interiorImage : [car.interiorImage];

  const formattedTime = currentTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

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
        <section className="car-detail">
          <h2>{car.model}</h2>
          <img src={process.env.PUBLIC_URL + car.image} alt={car.model} className="car-main-image" />
          <p><strong>Type:</strong> {car.type}</p>
          <p><strong>Price:</strong> ${car.price}</p>
          <p><strong>Description:</strong> {car.description}</p>

          <h3>Showcase Images</h3>
          <div className="slideshow">
            <div className="slideshow-container" style={{ transform: `translateX(-${currentShowcaseSlide * 100}%)` }}>
              {car.showcaseImages.map((img, index) => (
                <div className="slide" key={index}>
                  <img src={process.env.PUBLIC_URL + img} alt={`${car.model} showcase ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="button-container">
              {car.showcaseImages.map((_, index) => (
                <button
                  key={index}
                  className={`round-button ${index === currentShowcaseSlide ? 'active' : ''}`}
                  onClick={() => setCurrentShowcaseSlide(index)}
                ></button>
              ))}
            </div>
          </div>

          <h3>Interior Images</h3>
          <div className="slideshow">
            <div className="slideshow-container" style={{ transform: `translateX(-${currentInteriorSlide * 100}%)` }}>
              {interiorImages.map((img, index) => (
                <div className="slide" key={index}>
                  <img src={process.env.PUBLIC_URL + img} alt={`${car.model} interior ${index + 1}`} className="interior-image" />
                </div>
              ))}
            </div>
            <div className="button-container">
              {interiorImages.map((_, index) => (
                <button
                  key={index}
                  className={`round-button ${index === currentInteriorSlide ? 'active' : ''}`}
                  onClick={() => setCurrentInteriorSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>{formattedTime}</p>
      </footer>
    </div>
  );
}

export default CarDetail;
