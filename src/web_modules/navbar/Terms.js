import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./PolicyTerms.css"
import NewLogo from './skillsync.png';
import { Button } from "../../components/Component";

const TermsPage = () => {
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
    // background: '#cefad0',
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

  const TermsContentStyle = {
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
            style={{ width: '70px', height: '200px' }} />
        </Link>
        <div style={{ width: '80px' }} />
      </nav>

      <section style={TermsContentStyle}>
        <div style={cardStyle}>
        <h2>Terms and Conditions</h2>
            <p>Welcome to SkillSync! These terms and conditions outline the rules and regulations for the use of SkillSync's platform.</p>
            <h3>1. Introduction</h3>
            <p>By accessing and using our platform, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our platform.</p>
  
            <h3 style={{ textAlign: 'left',}}>2. Intellectual Property Rights</h3>
            <p>Unless otherwise stated, SkillSync and/or its licensors own the intellectual property rights for all material on the platform. All intellectual property rights are reserved. You may view and/or print pages from the platform for your own personal use subject to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul className="service-card-list">
              <li className="service-card-list-item">Republish material from the platform</li>
              <li className="service-card-list-item">Sell, rent, or sub-license material from the platform</li>
              <li className="service-card-list-item">Reproduce, duplicate, or copy material from the platform</li>
              <li className="service-card-list-item">Redistribute content from the platform</li>
            </ul>

            <h3>3. Acceptable Use</h3>
            <p>You must not use the platform in any way that causes, or may cause, damage to the platform or impairment of the availability or accessibility of the platform. You must not use the platform in any way which is unlawful, illegal, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</p>
  
            <h3>4. User Content</h3>
            <p>In these terms and conditions, "your user content" means material (including without limitation text, images, audio material, video material, and audio-visual material) that you submit to the platform, for whatever purpose.</p>
            <p>You grant to SkillSync a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to SkillSync the right to sub-license these rights and the right to bring an action for infringement of these rights.</p>
  
            <h3>5. Limitations of Liability</h3>
            <p>SkillSync will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this platform:</p>
            <ul>
              <li>To the extent that the platform is provided free-of-charge, for any direct loss</li>
              <li>For any indirect, special or consequential loss</li>
              <li>For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data</li>
            </ul>
            <br></br>
            <h3>6. Indemnity</h3>
            <p>You hereby indemnify SkillSync and undertake to keep SkillSync indemnified against any losses, damages, costs, liabilities and expenses (including without limitation legal expenses and any amounts paid by SkillSync to a third party in settlement of a claim or dispute on the advice of SkillSync's legal advisers) incurred or suffered by SkillSync arising out of any breach by you of any provision of these terms and conditions.</p>
  
            <h3>7. Breaches of These Terms and Conditions</h3>
            <p>Without prejudice to SkillSync's other rights under these terms and conditions, if you breach these terms and conditions in any way, SkillSync may take such action as SkillSync deems appropriate to deal with the breach, including suspending your access to the platform, prohibiting you from accessing the platform, blocking computers using your IP address from accessing the platform, contacting your internet service provider to request that they block your access to the platform and/or bringing court proceedings against you.</p>
  
            <h3>8. Variation</h3>
            <p>SkillSync may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of the platform from the date of the publication of the revised terms and conditions on this platform. Please check this page regularly to ensure you are familiar with the current version.</p>
  
            <h3>9. Assignment</h3>
            <p>SkillSync may transfer, sub-contract, or otherwise deal with SkillSync's rights and/or obligations under these terms and conditions without notifying you or obtaining your consent.</p>
            <p>You may not transfer, sub-contract, or otherwise deal with your rights and/or obligations under these terms and conditions.</p>
  
            <h3>10. Severability</h3>
            <p>If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p>
  
            <h3>11. Entire Agreement</h3>
            <p>These terms and conditions constitute the entire agreement between you and SkillSync in relation to your use of this platform, and supersede all previous agreements in respect of your use of this platform.</p>
  
            <h3>12. Law and Jurisdiction</h3>
            <p>These terms and conditions will be governed by and construed in accordance with the laws of the Philippines, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of the Philippines.</p>
          </div>
            <div style={animationContainerStyle}>
             {generateFloatingSquares2(50)}
            </div>
        </section>
    </div>
    );
};

export default TermsPage;

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