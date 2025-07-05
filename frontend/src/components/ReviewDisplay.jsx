import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/ReviewDisplay.css';

const ReviewDisplay = ({ review, loading, error }) => {
    return (
        <div className="review-display-container">
            <h2 className="review-title">Code Review</h2>

            {loading && <p className="loading-message">Reviewing code, please wait...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {review && !loading && (
                <div className="review-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
                </div>
            )}
            {!review && !loading && !error && (
                <p className="placeholder-message">Submit code to get a review!</p>
            )}
        </div>
    );
};

export default ReviewDisplay;