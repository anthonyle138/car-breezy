import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

function AboutUs() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    setVisitorCount((prevCount) => prevCount + 1);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
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
        <section className="about-us">
          <h2>About Us</h2>
          <p>Group Leader: Nguyễn Trần Đức Lộc - Student1572002</p>
          <p>Group Member: Lê Tuấn Anh - Student1574956</p>
          <p>Group Member: Vũ Thị Hoài Thu - Student1571993</p>
        </section>

        <section className="contact-info">
          <h2>Contact Us</h2>
          <p>If you have any questions or need further assistance, feel free to reach out to us:</p>
          <p><strong>Email:</strong> aptech.fpt@fe.edu.vn</p>
          <p><strong>Phone:</strong> (028) 7300-8866</p>
          <p><strong>Address:</strong> 590 Cach Mang Thang Tam, Ward 11, District 3, Ho Chi Minh City</p>
          <div className="map">
            <h3>Our Location</h3>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1959.6608726664945!2d106.66550987631102!3d10.786650999055851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ3JzExLjkiTiAxMDbCsDM5JzU4LjYiRQ!5e0!3m2!1sen!2sus!4v1727744783102!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <footer>
        <p>{formattedTime}</p>
        <p>Thank you for choosing us for your car buying journey!</p>
      </footer>
    </div>
  );
}

export default AboutUs;
