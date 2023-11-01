import React from "react";
import { Link } from "react-router-dom";
import "./landing.css"

function LandingPage() {
  return (

    <div className="landing-page">
      <h1>Welcome to the Piano Roll Project</h1>
      <p>Explore beautiful piano roll visualizations!</p>
      <button><Link to="/home">Get Started</Link></button>
    </div>
  );
}

export default LandingPage;
