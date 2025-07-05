import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import ReviewDisplay from '../components/ReviewDisplay';
import '../styles/HomePage.css';

const HomePage = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submitCode = async () => {
        setLoading(true);
        setError('');
        setReview(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to submit code.');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/review`,
                { code, language },
                config
            );

            setReview(data.review);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homepage-container">
            <div className="main-content-area">
                {/* Left Pane: Code Editor */}
                <div className="left-pane">
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={setLanguage}
                    />
                    <button
                        onClick={submitCode}
                        disabled={loading}
                        className="review-button"
                    >
                        {loading ? 'Reviewing...' : 'Get Code Review'}
                    </button>
                </div>

                {/* Right Pane: AI-generated feedback */}
                <div className="right-pane">
                    <ReviewDisplay review={review} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;