import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Ensure your index.css imports Bootstrap here

const LandingPage = () => {
    return (
        <div className='container text-center py-5'>
            <h1 className='display-4 fw-bold mb-3'>
                Unlock Your Potential with AI Learner
            </h1>
            <h3 className='lead mb-4'>
                Dive into a world where learning is truly personal. Our AI adapts to your unique journey,
                creating custom lessons and providing instant, clear answers to your every question.
            </h3>
            <p className='fs-5 text-muted mb-5'>
                Experience intelligent, tailored education delivered right when you need it.
            </p>

            {/* Main Feature Descriptions as Hover Cards */}
            <div className='row justify-content-center g-4 mb-5'>
                <div className='col-md-8'>
                    <div className='card h-100 feature-card mb-4'>
                        <div className='card-body text-dark'>
                            <p className='fs-5'>
                                Imagine a learning experience crafted just for you. Our advanced AI leverages vast knowledge
                                to generate highly relevant and engaging content, ensuring you get the information you need
                                in a way that clicks. Say goodbye to one-size-fits-all learning – get material that truly resonates.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='card h-100 feature-card mb-4'>
                        <div className='card-body text-dark'>
                            <p className='fs-5'>
                                Stuck on a concept? Our instant answer feature provides clear, concise explanations
                                for complex topics, breaking them down into easily digestible parts. From quick definitions
                                to in-depth analyses, get the knowledge you need, precisely when you need it,
                                without sifting through endless search results.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='card h-100 feature-card'>
                        <div className='card-body text-dark'>
                            <p className='fs-5'>
                                Whether you're preparing for an exam, exploring a new subject, or just curious,
                                AI Learner empowers you to master any topic at your own pace. Join a learning revolution
                                that puts you first.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Main Feature Descriptions as Hover Cards */}

            <div className='d-flex justify-content-center align-items-center flex-column flex-md-row gap-3 mt-5'>
                <button type='button' className='btn btn-primary btn-lg'>
                    <Link to='/login' className='text-white text-decoration-none'>Login</Link>
                </button>
                <button type='button' className='btn btn-outline-primary btn-lg'>
                    <Link to='/register' className='text-decoration-none'>Sign Up</Link>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
