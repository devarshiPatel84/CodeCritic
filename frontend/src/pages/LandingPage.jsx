
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">CodeCritic</h1>
          <p className="hero-tagline">
            Get instant code feedback powered by AI. Improve your code quality with intelligent suggestions and comprehensive analysis.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            {/* <Link to="/signup" className="btn btn-primary">
              Sign In
            </Link> */}
          </div>
          <div className="auth-links">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>

        </div>
        
        {/* <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Intelligent Analysis</h3>
            <p>Advanced AI algorithms analyze your code for bugs, performance issues, and best practices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Feedback</h3>
            <p>Get immediate suggestions and improvements without waiting</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Learn & Improve</h3>
            <p>Understand why changes are suggested and become a better developer</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
