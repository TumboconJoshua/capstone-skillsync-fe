// Navigation.js
import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navigation.css";
import logo from "./skillsync.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoStyle = {
    height: "80px",
    width: "120px",
    margin: "0px 0px",
    '@media (maxWidth: 600px)': {
      margin: '0 0 10px 0',
    },
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "";
  };

  return (
    <nav className="navigation" >
    <div className="nav-container">
      <div className="nav-logo" style={logoStyle}>
        <img src={logo} alt="SkillSync Logo" style={{ height: '90%', width: '65%' }}/>
      </div>
      <div className="nav-menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`nav-menu ${isOpen ? "nav-menu-active" : ""}`} >
        <li>
          <a href="/#/home" onClick={toggleMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</a>
        </li>
        <li>
          <a href="/#/about" onClick={toggleMenu}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</a>
        </li>
        <li>
          <a href="/#/services" onClick={toggleMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Services</a>
        </li>
        <li >
          <a href="/#/team" onClick={toggleMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Team</a>
        </li>
        <li>
          <a href="/#/contact" onClick={toggleMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</a>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Navigation;
