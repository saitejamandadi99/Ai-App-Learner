import './index.css';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FiBook, FiCalendar, FiEye } from 'react-icons/fi';

const HistoryPage = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');

    const fetchHistory = async () => {
        const token = Cookie.get('token');
        if (!token) {
            setError('You are not logged in. Please log in to view your history.');
            return;
        }

        setLoading(true);
        setError('');
        setHistoryItems([]);
        setSelectedItem(null);

        try {
            const url = 'http://localhost:5000/api/lessonplan/history';
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.history) {
                setHistoryItems(response.data.history);
                setAllItems(response.data.history);
            } else {
                setError('Failed to fetch history: Invalid response format from server.');
            }
        } catch (error) {
            console.error('Error fetching history:', error);
            if (error.response) {
                setError(error.response.data.message || 'Failed to fetch history. Please try again later.');
            } else if (error.request) {
                setError('Cannot connect to the server. Please check your network connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleViewDetails = item => {
        setSelectedItem(item);
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);
        const filtered = allItems.filter(item => item.topic.toLowerCase().includes(keyword));
        setHistoryItems(filtered);
    };

    return (
        <div className="historyPage p-4">
            <h1 className="text-center mb-4">📚 My Lesson Plan History</h1>

            <div className="container mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by topic..."
                    className="form-control shadow-sm"
                />
            </div>

            {isLoading && <div className="text-center">Loading history...</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!isLoading && !error && historyItems.length === 0 && (
                <div className="text-center alert alert-info">
                    No lesson plans generated yet. Go to the "Home" page to create one!
                </div>
            )}

            <div className="row">
                {!isLoading && !error && historyItems.map((item) => (
                    <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-sm h-100 custom-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <FiBook className="me-2" />
                                    {item.topic}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Grade: {item.grade}
                                </h6>
                                <p className="card-text text-truncate">
                                    {item.lessonPlan ? item.lessonPlan.substring(0, 150) + '...' : 'No content available.'}
                                </p>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleViewDetails(item)}
                                >
                                    <FiEye className="me-1" /> View
                                </button>
                            </div>
                            <div className="card-footer text-muted">
                                <FiCalendar className="me-1" />
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div className="modal-overlay">
                    <div className="modal-content bg-white p-4 rounded shadow-lg">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2>Lesson Plan Details</h2>
                            <button className="btn btn-danger" onClick={handleCloseDetails}>Close</button>
                        </div>

                        <div>
                            {selectedItem.topic && selectedItem.grade && (
                                <>
                                    <h3 className="text-center">{selectedItem.topic} (Grade {selectedItem.grade})</h3>
                                    <hr />
                                </>
                            )}
                            <ReactMarkdown>{selectedItem.lessonPlan}</ReactMarkdown>
                            <div className="text-center text-muted mt-3">⬇️ Scroll to read more ⬇️</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
