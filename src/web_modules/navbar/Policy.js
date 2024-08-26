import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebook, FaEnvelope, FaSearchLocation} from 'react-icons/fa';
import "./PolicyTerms.css"
import NewLogo from './skillsync.png';
import { Button } from "../../components/Component";

const PolicyPage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const generateFloatingSquares2 = (numSquares) => {
    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      const style2 = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${5 + Math.random() * 30}s`,
        animationDelay: `${Math.random() * 100}s`,
      };
      squares.push(<div key={i} className="floating" style={style2}></div>);
    }
    return squares;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#cefad0',
    zIndex: '10'
    // background: 'linear-gradient(to bottom, #ffffff 30%, #cefad0)',
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

  const PolicyContentStyle = {
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

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => navigate('/home'), 500);
  };

  return (
    <div style={containerStyle}>
      <nav style={navbarStyle}>
        <div>
          <Button size="xl" className="btn-primary" color="primary" onClick={handleClick}  onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
            <IoMdArrowRoundBack color="light"/>
          </Button>
        </div>

        <Link to={process.env.PUBLIC_URL + "/home"} className="logo-link">
          <img
            className="logo-dark logo-img logo-img-lg mx-auto"
            src={NewLogo}
            alt="logo-dark"
            style={{ width: '100px', height: '200px' }} />
        </Link>
        <div style={{ width: '80px' }} />
      </nav>

      <section style={PolicyContentStyle}>
        <div style={cardStyle}>
          <h2>Privacy Policy</h2>
          <p>
            Welcome to SkillSync, a recruitment platform powered by content-based filtering. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          <h3>1. Information We Collect</h3>
          <p>We may collect information about you in a variety of ways. The information we may collect via the platform includes:</p>
          <ul className="service-card-list">
            <li className="service-card-list-item"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and contact details that you voluntarily give to us when you register with the platform.</li>
            <li className="service-card-list-item"><strong>Derivative Data:</strong> Information our servers automatically collect when you access the platform, such as your IP address, browser type, and operating system.</li>
            <li className="service-card-list-item"><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
          </ul>
          <br></br>
          <h3>2. Use of Information</h3>
          <p>We use the information we collect in the following ways:</p>
          <ul className="service-card-list">
            <li className="service-card-list-item">To find and prevent fraud</li>
            <li className="service-card-list-item">To provide, operate, and maintain our platform</li>
            <li className="service-card-list-item">To improve, personalize, and expand our platform</li>
            <li className="service-card-list-item">To understand and analyze how you use our platform</li>
            <li className="service-card-list-item">To develop new features, services and functionality</li>
            <li className="service-card-list-item">To comply with legal obligations</li>
            <li className="service-card-list-item">To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the platform, and for marketing and promotional purposes</li>
          </ul>
          
            <h3>3. Disclosure of Information</h3>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul className="service-card-list">
            <li className="service-card-list-item"><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li className="service-card-list-item"><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li className="service-card-list-item"><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li className="service-card-list-item"><strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</li>
            </ul>
            
            <h3>4. Security of Information</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
            <br></br>
            <h3>5. Policy for Children</h3>
            <p>We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us at skillsync@gmail.com.</p>
            <br></br>
            <h3>6. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            <br></br>
            <h3>7. Contact Us</h3>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <p><FaFacebook style={{ marginRight: '5px' }} /><a href="https://www.facebook.com/skillsyncpage" style={linkStyle}> Facebook</a></p>
            <p><FaEnvelope style={{ marginRight: '5px' }} /> skillsync@gmail.com</p>
            <p><FaSearchLocation style={{ marginRight: '5px' }}/> Address Example</p>
            </div>

            {/* To apply, you may send your resume, certificates, and requirements through our email:
gbmercadoagency@gmail.com 
gbmercadoagency.bataan@gmail.com 
We accept walk-in applicants from Monday to Friday from 8:00 a.m. to 5:00 p.m.
You can also visit our head office and satellite office in Olongapo, Bataan and Quezon City. 
📍#10 23rd St. Corner Caron St. West Bajac-Bajac Olongapo City 
📍#340 Centro I, Palihan, Hermosa Bataan
📍Unit B2 Ter#2, 2nd Floor, 24K Mansion, 45 Timog Avenue, Barangay South Triangle, Quezon City
Contact us at 0917-115-6940 | 0917-136-0637 | 0917-138-9563 */}

            <div style={animationContainerStyle}>
             {generateFloatingSquares2(50)}
            </div>
        </section>
    </div>
    );
};

export default PolicyPage;

const linkStyle = {
  color: '#526484',
  textDecoration: 'none',
}

const animationContainerStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  bottom: '100%',
  width: '100%',
  height: '287%',
  overflow: 'hidden',
  zIndex: '1',
};