import React, { useState } from "react";
import Navigation from "./Navigation"; 
import profile1 from './1owner.jpg';
import profile2 from './2owner.jpg';
import profile3 from './3owner.jpg';
import icon from './vector.png';
import logo from './skillsyncph.png'
import { FaFacebook, FaEnvelope, FaPhone} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faTools } from '@fortawesome/free-solid-svg-icons';
import "./Services.css";

const LandingPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hover, setHover] = useState(false);

  // Modal Display
  const handleCardClick = (memberName) => {
    setSelectedMember(memberName);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedMember(null);
  };

  const generateFloatingSquares1 = (numSquares) => {
    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      const style1 = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      squares.push(<div key={i} className="floating-square1" style={style1}></div>);
    }
    return squares;
  };
  
  // Modal Content
  const modalContent = () => {
    switch (selectedMember) {
      case 'Ehdsell John B. Apan':
        return (
          <>
            <img src={profile1} alt="Ehdsell John B. Apan" style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'sans-serif', textAlign: 'center', }}>Frontend Developer</h3>
                <h5 style={{ fontFamily: 'sans-serif'}}>Ehdsell John B. Apan</h5>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <FaEnvelope style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold'}}  /><a style={{color: '#364a63', fontWeight: 'bold'}}>202110041@gordoncollege.edu.ph</a>
                <div>
                  <FaFacebook style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold' }}/><a href="https://www.facebook.com/Grayfullbuster.Hunter" style={{color: '#364a63', fontWeight: 'bold'}}>Facebook</a>
                </div>
                  
              </div>
            </div>
          </>
        );
      case 'Raymond Paul T. Vianzon':
        return (
          <>
            <img src={profile2} alt="Raymond Paul T. Vianzon" style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'sans-serif', textAlign: 'center', }}>Quality Assurance</h3>
                <h5 style={{ fontFamily: 'sans-serif'}}>Raymond Paul T. Vianzon</h5>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <FaEnvelope style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold'}}  /><a style={{color: '#364a63', fontWeight: 'bold'}}>202111087@gordoncollege.edu.ph</a>
                
                <div>
                  <FaFacebook style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold' }}/><a href="https://www.facebook.com/raymond.vianzon.31" style={{color: '#364a63', fontWeight: 'bold'}}>Facebook</a>
                </div>
              </div>
            </div>
          </>
        );
      case 'Joshua B. Tumbocon':
        return (
          <>
            <img src={profile3} alt="Joshua B. Tumbocon" style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'sans-serif', textAlign: 'center', }}>Backend Developer</h3>
                <h5 style={{ fontFamily: 'sans-serif'}}>Joshua B. Tumbocon</h5>
                  <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <FaEnvelope style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold'}}  /><a style={{color: '#364a63', fontWeight: 'bold'}}>202110262@gordoncollege.edu.ph</a>
                  <div>
                  <FaFacebook style={{ marginRight: '5px', color: '#364a63', fontWeight: 'bold' }}/><a href="https://www.facebook.com/TumboconJoshua" style={{color: '#364a63', fontWeight: 'bold'}}>Facebook</a>
                  </div>
                </div>
              </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
    
    <div>
      <Navigation />
      <div id="home">
        <div className="content">
          <h1 className="heading">
            WELCOME TO SKILLSYNC
          </h1>
          <p style={{ fontFamily: 'sans-serif', marginTop: '20px', fontSize: '1.3rem', margin: '10px' }}>
            "Where Talent meets Equal and Limitless Opportunities."
          </p>
          <div className="buttons" style={{ display: 'flex', marginTop: '20px', padding: '0 30px' }}>
            <a style={buttonStyle} href={`${process.env.PUBLIC_URL}/auth`} 
              onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
              SIGN-IN
            </a>
            <a style={buttonStyle} href={`${process.env.PUBLIC_URL}/reg-job`} 
              onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
              SIGN-UP
            </a>
          </div>
        </div>
          <img
            src={icon}
            alt="icon"
            className={`icon ${hover ? 'hover' : ''}`}
            style={{
              transition: 'transform 0.3s, filter 0.3s',
              transform: hover ? 'scale(1.1) translateY(-10px)' : 'scale(1) translateY(0)',
              filter: hover ? 'brightness(1.2)' : 'brightness(1)'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
            <div style={animationContainerStyle}>
              {generateFloatingSquares1(10)}
            </div>
          </div>
        </div>




    <div style={{ borderTop: '1px solid #ccc'}}></div>




    <div id="/about" style={{ padding: '50px 20px', textAlign: 'center', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', background: 'linear-gradient(to bottom, #ffffff 60%, #cefad0)', }}>
      <div className="nav-logo" style={{ margin: '40px 50px 50px 70px' }}>
        <img src={logo} alt="SkillSync Logo" style={{ height: '100%', width: '100%', maxWidth: '450px' }} />
      </div>

      <div style={{ flex: '1', maxWidth: '650px', padding: '0 30px', margin: '100px 0px 0px 0px'}}>
        <h2 className="about-heading">About Us</h2>
        <p className="about-description">
          At SkillSync, we're passionate about connecting talented individuals with their dream careers through our advanced recruitment platform. Our cutting-edge technology leverages content-based filtering to match candidates with opportunities that align not only with their skills but also with their career aspirations and personal values.
        </p>

        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '201px' }}>
          <a style={buttonStyle} href="https://www.facebook.com/profile.php?id=61564369937925"  onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
            VISIT OUR FB PAGE
          </a>
          <a style={buttonStyle} href={`${process.env.PUBLIC_URL}/learn`}  onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
            LEARN MORE
          </a>
        </div>
      </div>
    </div>




    <div style={{ borderTop: '1px solid #ccc',}}></div>




    <div id='/services' style={{ padding: '50px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, #ffffff 60%, #cefad0)', }}>
      <div style={{marginBottom: '170px'}}>
      <h2 className="services-heading">WHAT WE OFFER?</h2>
      <p className="services-description">SkillSync offers three key features that set us apart</p>

      <div
        className={`service-card ${hoveredCard === 'employers' ? 'hover' : ''}`}
        onMouseEnter={() => setHoveredCard('employers')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <FontAwesomeIcon icon={faBuilding} size="2x" className="service-card-icon" />
        <h3 className="service-card-title">For Employers</h3>
        <ul className="service-card-list">
          <li className="service-card-list-item">Access to a diverse pool of skilled professionals.</li>
          <li className="service-card-list-item">Streamlined recruitment process with advanced filtering options.</li>
          <li className="service-card-list-item">Customized hiring solutions tailored to your company's needs.</li>
        </ul>
      </div>

      <div
        className={`service-card ${hoveredCard === 'candidates' ? 'hover' : ''}`}
        onMouseEnter={() => setHoveredCard('candidates')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <FontAwesomeIcon icon={faUser} size="2x" className="service-card-icon" />
        <h3 className="service-card-title">For Candidates</h3>
        <ul className="service-card-list">
          <li className="service-card-list-item">Personalized job matching based on skills and preferences.</li>
          <li className="service-card-list-item">Career resources including resume building and interview preparation.</li>
          <li className="service-card-list-item">Access to exclusive job opportunities from top companies.</li>
        </ul>
      </div>

      <div
        className={`service-card ${hoveredCard === 'services' ? 'hover' : ''}`}
        onMouseEnter={() => setHoveredCard('services')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <FontAwesomeIcon icon={faTools} size="2x" className="service-card-icon" />
        <h3 className="service-card-title">Services</h3>
        <ul className="service-card-list">
          <li className="service-card-list-item">Automatically generates standard resumes based on user information and preferences.</li>
          <li className="service-card-list-item">Job recommendations that match the user current role or desired career progression.</li>
          <li className="service-card-list-item">Access to broad range of job opportunities across various industries and sectors.</li>
        </ul>
      </div>
      </div>
    </div>




    <div style={{ borderTop: '1px solid #ccc',  }}></div>




      {/* Team Section */}
      <div id="/team" style={{ padding: '50px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: 'linear-gradient(to bottom, #ffffff 50%, #cefad0)',}}>
          <div style={{marginBottom: '120px',}}>
          <h2 style={sectionHeadingStyle}>Meet Our Team</h2>
          <h3 style={{ fontFamily: 'sans-serif'}}>TechTonic Innovations</h3>
          <p style={{ fontSize: '17px'}}>A student developers who are enthusiastic developing new skills and finding solutions, dedicated to innovation and continuous learning.</p>
          <div style={teamContainerStyle}>
            
            <div style={cardStyle} onClick={() => handleCardClick('Ehdsell John B. Apan')}>
              <img src={profile1} alt="Ehdsell John B. Apan" style={imageStyle} />
              <div style={contentStyle}>
                <h3 style={headingStyle}>Frontend Developer</h3>
                <p style={nameStyle}>Ehdsell John B. Apan</p>
              </div>
            </div>
          
            
            
            <div style={cardStyle} onClick={() => handleCardClick('Raymond Paul T. Vianzon')}>
              <img src={profile2} alt="Raymond Paul T. Vianzon" style={imageStyle} />
              <div style={contentStyle}>
                <h3 style={headingStyle}>Quality Assurance</h3>
                <p style={nameStyle}>Raymond Paul T. Vianzon</p>
              </div>
            </div>
            
            
            <div style={cardStyle} onClick={() => handleCardClick('Joshua B. Tumbocon')}>
              <img src={profile3} alt="Joshua B. Tumbocon" style={imageStyle} />
              <div style={contentStyle}>
                <h3 style={headingStyle}>Backend Developer</h3>
                <p style={nameStyle}>Joshua B. Tumbocon</p>
              </div>
            </div>
          </div>
          
          
          {selectedMember && (
            <div style={modalOverlayStyle}>
              <div style={modalContainerStyle} onClick={closeModal}>
                <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                  <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
                  {modalContent()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      








      <div id="/contact" style={containerStyle}>
        <div style={leftSectionStyle}>
          <img src={logo} alt="Logo" style={logoStyle} />
          <p style={textStyle}>Embrace diversity and unlock new opportunities in your career.</p>
        </div>

        <div style={centerSectionStyle}>
          <p style={headerStyle}>Contact us</p>
          <p><FaFacebook style={{ marginRight: '5px' }} /><a href="https://www.facebook.com/profile.php?id=61564369937925" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#077947'}
                       onMouseLeave={(e) => e.target.style.color = '#333'}> SkillSync</a></p>
          <p><FaEnvelope style={{ marginRight: '5px' }} /><a href="https://mail.google.com/mail/u/5/#inbox?compose=CllgCJvkXVKqfdlWWqtsSvHttXwJCtskgFZJrhXfHMjxPkwwKZVRRWBxqDTXQbvKwrLhxkmZcSB" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#077947'}
                       onMouseLeave={(e) => e.target.style.color = '#333'}> skillsyncph@gmail.com</a></p>
          <p><FaPhone style={{ marginRight: '5px' }} /> +63 905 508 2630</p>
        </div>

        <div style={rightSectionStyle}>
          <p style={headerStyle}>Help</p>
          <p><a href="/privacy-policy" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#077947'}
                       onMouseLeave={(e) => e.target.style.color = '#333'}>Privacy Policy</a></p>
          <p><a href="/terms-and-conditions" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#077947'}
                       onMouseLeave={(e) => e.target.style.color = '#333'}>Terms and Conditions</a></p>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#28282B', color: '#f1f1f1' }}>
        <div id="footer">
          <p style={{ marginTop: '20px', marginBottom: '20px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '14px' }}>All rights reserved © Team TechTonic Innovations 2024</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;

// Home
const responsiveHomeStyle = {
  padding: '50px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom, #ffffff 40%, #cefad0)',
  position: 'relative',
  overflow: 'hidden',
  '@media(minWidth: 768px)': {
    flexDirection: 'row', // Row direction for larger screens
    justifyContent: 'space-between', // Space between content and image
    textAlign: 'left',
  },
};

const responsiveContentStyle = {
  fontFamily: 'sans-serif',
  width: '100%',
  zIndex: '10',
  '@media(minWidth: 768px)': {
    width: '50%',
    textAlign: 'left', // Align text to the left on larger screens
    margin: '0', // Remove margins on larger screens
  },
  '@media(maxWidth: 768px)': {
    textAlign: 'center', // Center text on smaller screens
    marginTop: '30px',
    marginBottom: '50px',
  },
};

const responsiveImageStyle = {
  maxWidth: '100%',
  height: 'auto',
  zIndex: '10',
  '@media(minWidth: 768px)': {
    width: '50%',
    marginTop: '0',
    marginLeft: 'auto',
    marginRight: '0', // Align image to the right
  },
  '@media(maxWidth: 768px)': {
    width: '100%',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const animationContainerStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  overflow: 'hidden', 
  zIndex: '1',  
};





const sectionHeadingStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  marginBottom: '40px',
  fontFamily: 'sans-serif'
};



const buttonStyle = {
  padding: '10px 20px',
  margin: '0 10px 10px 0',
  backgroundColor: '#088e54',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'transform 0.2s ease-in-out', 

  '@media (maxWidth: 600px)': {
    padding: '8px 16px',
    fontSize: '14px',
  },
};



// Team
const teamContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const cardStyle = {
  background: '#fff',
  width: '250px',
  margin: '30px',
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2)',
  transition: '0.3s',
  borderRadius: '20px',
  cursor: 'pointer',
  overflow: 'hidden',
  marginLeft: '25px',


  '@media (maxWidth: 768px)': {
    width: '200px',
    margin: '5px',
  },
  '@media (maxWidth: 480px)': {
    width: '200px',
    margin: '0px 0px',
  },
};

const imageStyle = {
  width: '100%',
  height: 'auto',
};

const contentStyle = {
  padding: '30px',
  textAlign: 'center',
  '@media (maxWidth: 768px)': {
    padding: '20px',
  },
  '@media (maxWidth: 480px)': {
    padding: '10px',
  },
};

const headingStyle = {
  fontSize: '1.2rem',
  margin: '10px 0',
  '@media (maxWidth: 768px)': {
    fontSize: '1rem',
  },
  '@media (maxWidth: 480px)': {
    fontSize: '0.9rem',
  },
};

const nameStyle = {
  fontSize: '1rem',
  color: '#666',
  '@media (maxWidth: 768px)': {
    fontSize: '0.9rem',
  },
  '@media (maxWidth: 480px)': {
    fontSize: '0.8rem',
  },
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalContainerStyle = {
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '20px',
  maxWidth: '450px',
  width: '93%',
  textAlign: 'center',
  border: '3px solid #088e54',
  zIndex: 9999,

  '@media (maxWidth: 768px)': {
    padding: '10px',
    maxWidth: '200px',
    width: '50%',
  },
};

const modalContentStyle = {
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '1.5rem',
  cursor: 'pointer',
};



// Contact
const containerStyle = {
  backgroundColor: '#f0f0f0',
  borderTop: '1px solid #333',
  
  color: '#333',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '20px',
  justifyContent: 'space-between',
};

const leftSectionStyle = {
  flex: '1.5',
  margin: '0 20px',
  fontFamily: 'sans-serif',
  textAlign: 'justify',
  marginBottom: '50px',
  minWidth: '250px',
  
};

const centerSectionStyle = {
  flex: '1.5',
  textAlign: 'justify',
  margin: '0 20px',
  fontFamily: 'sans-serif',
  minWidth: '250px',
  marginTop: '25px',
  marginBottom: '25px'
};

const rightSectionStyle = {
  flex: '1.5',
  textAlign: 'left',
  margin: '0 20px',
  fontFamily: 'sans-serif',
  minWidth: '250px',
  marginTop: '25px',
};

const logoStyle = {
  marginTop: '20px',
  width: '100px',
  height: '100px',
};

const textStyle = {
  fontSize: '14px',
  maxWidth: '350px',
};

const headerStyle = {
  fontSize: '25px',
  marginBottom: '10px',
};

const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  

  '@media (maxWidth: 768px)': {
    containerStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    leftSectionStyle: {
      marginLeft: '0',
      marginBottom: '20px',
      flex: '1 1 100%', 
    },
    centerSectionStyle: {
      margin: '20px 0',
      flex: '1 1 100%',
    },
    rightSectionStyle: {
      marginTop: '20px',
      margin: '20px 0',
      flex: '1 1 100%', 
    },
  },
}



