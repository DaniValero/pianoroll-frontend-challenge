import React from "react";
import logo from "../assets/white.svg";
import "./navBar.css"

function NavBar() {

  return (
    <nav className="navbar">
      <img src={logo} alt="company-logo"/>
    </nav>
  )

}

export default NavBar;