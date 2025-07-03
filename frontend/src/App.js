import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage'; 
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import './App.css';

function App() {
    const isAuthenticated = () => {
        return localStorage.getItem('token') ? true : false;
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            {<Header />}
            <main className="container">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    
                    <Route
                        path="/"
                        element={isAuthenticated() ? <Navigate to="/home" /> : <LandingPage />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;