import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/History.css';

const History = ({onSelect, refreshHistory, isSidebarOpen}) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            setError('You must be logged in to view history.');
            setLoading(false);
            return;
            }

            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            };

            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, config);
            setHistory(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch history.');
        } finally {
            setLoading(false);
        }
    };

    fetchHistory();
  }, [refreshHistory]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className={`history-sidebar ${isSidebarOpen ? 'history-sidebar-open' : 'history-sidebar-closed'}`}>
        <h2>Review History</h2>
        {isSidebarOpen && (
        <>
        {loading ? (
            <p>Loading history...</p>
        ) : error ? (
            <p className="history-error">{error}</p>
        ) : history.length === 0 ? (
            <p>No review history found.</p>
        ) : (
            <ul className="history-list">
            {history.map((entry) => (
                <li
                key={entry._id}
                className="history-item"
                onClick={() => onSelect(entry)}
                >
                <div className="history-item-title">
                    {entry.language} - {formatTimestamp(entry.createdAt)}
                </div>
                </li>
            ))}
            </ul>
        )}
        </>
    )}
    </div>
    
  );
};

export default History;