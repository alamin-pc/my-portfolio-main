import React, {useContext} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {Link} from "react-router-dom";

function Header() {
  const {isDark} = useContext(StyleContext);

  const closeMenu = () => {
    const menuBtn = document.getElementById("menu-btn");
    if (menuBtn) menuBtn.checked = false;
  };

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/#greeting" className="logo">
          <span className="logo-name">
            <span className="r-brand">r</span>Albab
          </span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li>
            <a href="/#greeting" onClick={closeMenu}>Home</a>
          </li>
          <li>
            <a href="/#education" onClick={closeMenu}>Education</a>
          </li>
          <li>
            <a href="/#research" onClick={closeMenu}>Research</a>
          </li>
          <li>
            <a href="/#projects" onClick={closeMenu}>Projects</a>
          </li>
          <li>
            <a href="/#experience" onClick={closeMenu}>Experiences</a>
          </li>
          <li>
            <a href="/#skills" onClick={closeMenu}>Skills</a>
          </li>
          <li>
            <Link to="/blogs" onClick={closeMenu}>Blog</Link>
          </li>
          <li>
            <a href="/#contact" onClick={closeMenu}>Contact</a>
          </li>
          <li>
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
