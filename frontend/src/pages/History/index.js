import './index.css';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';



const HistoryPage = () =>{
    const [historyItems, setHistoryItems] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    

    const fetchHistory = async () =>{
        const token = Cookie.get('token');
        if (!token) {
            setError('You are not logged in. Please log in to view your history.');
            setLoading(false); 
            return;
        }
        
        setLoading(true);
        setError('');
        setHistoryItems([]); 
        setSelectedItem(null); 
         

        try {
            const url = 'http://localhost:5000/api/lessonplan/history';
            const response = await axios.get(url, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data && response.data.history){
                setHistoryItems(response.data.history);
            }
            else {
                setError('Failed to fetch history: Invalid response format from server.');
            }
            
        } catch (error) {
            console.error('Error fetching history:', error);
            if (error.response) {
                setError(error.response.data.message || 'Failed to fetch history. Please try again later.');
            }   
            else if (error.request) {
                setError('Cannot connect to the server. Please check your network connection or try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchHistory();
    },[]);


    const handleViewDetails = item =>{
        setSelectedItem(item); 
         
    }

    const handleCloseDetails = () =>{
        setSelectedItem(null);
         
    }

    return (
        <div className="historyPage p-4">
            <h1 className="text-center mb-4">My Lesson Plan History</h1>

            {isLoading && <div className="text-center">Loading history...</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!isLoading && !error && historyItems.length === 0 && (
                <div className="text-center alert alert-info">No lesson plans generated yet. Go to the "Home" page to create one!</div>
            )}

            <div className="row">
                {!isLoading && !error && historyItems.length > 0 && historyItems.map((item) => (
                    <div key={item._id} className="col-md-6 col-lg-4 mb-4"> 
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{item.topic}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Grade: {item.grade}</h6>
                                <p className="card-text text-truncate">{item.lessonPlan ? item.lessonPlan.substring(0, 150) + '...' : 'No content available.'}</p>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleViewDetails(item)}
                                >
                                    View
                                </button>
                            </div>
                            <div className="card-footer text-muted">
                                Generated: {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="modal-content bg-white p-4 rounded shadow-lg" style={{
                        width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );  
}

export default HistoryPage;