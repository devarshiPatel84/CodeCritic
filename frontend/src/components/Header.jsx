import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">CodeCritic</Link>
        <div>
          <button onClick={logoutHandler} className="logout-button">Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
