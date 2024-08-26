import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'reactstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Services.css";

const LearnPage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const generateFloatingSquares1 = (numSquares) => {
    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      squares.push(<div key={i} className="floating-square1" style={style}></div>);
    }
    return squares;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // transition: 'transform 0.5s ease-in-out',
    // transform: isClicked ? 'translateY(0)' : 'translateY(-100)',
    background: 'linear-gradient(to bottom, #ffffff 30%, #cefad0)',
    zIndex: '10'
  };

  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  
  const aboutHeaderStyle = {
    margin: '0',
    fontSize: '30px',
    textAlign: 'center',
    marginRight: '20px'
  };

  const aboutContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '80%',
    maxWidth: '800px',
    marginTop: '20px',
    zIndex: '10'
};

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '10px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '100%', 
    margin: '10px', 
    border: '1px solid ##088e54',
    borderLeft: '5px solid #088e54',
    textAlign: 'justify',
    zIndex: '10'
  };

  const animationContainerStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '120%',
    overflow: 'hidden', 
    zIndex: '1',  
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => navigate('/home'), 500); 
  };

  return (
    <div style={containerStyle} >
      <nav style={navbarStyle}>
        <div >
          <Button size="xl" className="btn-primary" color="primary" onClick={handleClick}  onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
            <IoMdArrowRoundBack color="light"/>
          </Button>
        </div>
        <h1 style={aboutHeaderStyle}>About Us</h1>
        <div style={{ width: '24px' }} /> 
      </nav>

      <section style={aboutContentStyle}>
        <div style={cardStyle}>
          <h2>Welcome to SkillSync</h2>
          <p >
            A revolutionary recruitment platform designed to match the right talent with the right opportunities. Our content-based filtering system ensures that candidates and employers find the perfect fit based on skills, experience, and job requirements.
          </p>
        </div>
        <div style={cardStyle}>
          <h2>Our Mission</h2>
          <p>
            Our aim is to simplify the hiring process and help organizations find the best candidates quickly and efficiently. We aim to bridge the gap between job seekers and employers by providing a seamless and intuitive platform for recruitment.
          </p>
        </div>
        <div style={cardStyle}>
          <h2>Why Choose SkillSync?</h2>
          <ul className="service-card-list">
            <li className="service-card-list-item">Advanced Content-Based Filtering</li>
            <li className="service-card-list-item">Easy-to-Use Interface</li>
            <li className="service-card-list-item">Comprehensive Candidate Profiles</li>
            <li className="service-card-list-item">Efficient Job Matching</li>
            <li className="service-card-list-item">Secure and Confidential</li>
          </ul>
        </div>
        <div style={cardStyle}>
          <h2>Contact Us</h2>
          <p>Have any questions or need support?</p>
            <p>
            Feel free to reach out to us at <a href="">skillsync@gmal.com</a> <a>or message our Facebook page </a><a href="">SkillSync.</a> <a>We're here to help!</a>
          </p>
          
        </div>
        <div style={animationContainerStyle}>
          {generateFloatingSquares1(10)}
        </div>
      </section>
    </div>
  );
};

export default LearnPage;
