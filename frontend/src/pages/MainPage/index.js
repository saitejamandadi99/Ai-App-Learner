import './index.css';
import { useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaArrowDown } from 'react-icons/fa';

const MainPage = () => {
    const [topic, setTopic] = useState('');
    const [grade, setGrade] = useState('');
    const [question, setQuestion] = useState('');
    const [objectives, setObjectives] = useState('');
    const [assessment, setAssessment] = useState('');
    const [lessonPlan, setLessonPlan] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const prompt = `You are an AI tutor designed to help a student learn. Based on the following inputs, create a comprehensive and easy-to-understand study guide or explanation for a student:
        Topic: ${topic}
        Grade Level: ${grade}
        Main Question/Focus: ${question || `Explain everything about ${topic}.`}
        Key Learning Objectives: ${objectives || `Provide a short description of ${topic}.`}
        Assessment Goal: ${assessment || `Prepare me for a question on ${topic}.`}

        Your output should be a detailed explanation of the topic, breaking it down into key concepts. Include:
        - A clear introduction to the topic.
        - Simple explanations of core ideas.
        - Relevant examples to illustrate concepts.
        - Key vocabulary definitions.
        - A summary of the main points.
        - A relevant practice question or activity related to the assessment goal.

        Please format your response using Markdown for clear headings, bullet points, bold text, and code blocks (if applicable for the topic). Aim for a friendly and encouraging tone suitable for a student.`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        setLessonPlan('');

        if (!topic || !grade) {
            setError('Topic and Grade are required to generate a lesson plan.');
            setLoading(false);
            return;
        }

        const token = Cookie.get('token');
        if (!token) {
            setError('You are not logged in. Please log in to generate a lesson plan.');
            setLoading(false);
            return;
        }

        try {
            const url = 'http://localhost:5000/api/lessonplan/generate';
            const response = await axios.post(
                url,
                { prompt, topic, grade },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.lessonPlan) {
                setLessonPlan(response.data.lessonPlan);
                setSuccess('Lesson plan generated successfully!');
                setTopic('');
                setGrade('');
                setQuestion('');
                setObjectives('');
                setAssessment('');
            } else {
                setError('Failed to generate lesson plan: Invalid response format from server.');
            }
        } catch (e) {
            console.error('Error in generating lesson plan:', e);
            if (e.response) {
                setError(e.response.data.message || 'Failed to generate lesson plan. Please try again.');
            } else if (e.request) {
                setError('Cannot connect to the server. Please check your network connection or try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mainPage container py-5'>
            {/* Headline and Tagline */}
            <div className='text-center mb-5'>
                <h1 className='display-4 fw-bold text-primary'>AI Lesson Planner</h1>
                <p className='lead text-secondary'>Instantly generate structured lesson plans for any topic, powered by AI.</p>
            </div>

            {/* Form Card */}
            <div className='card p-4 shadow-sm mx-auto' style={{ maxWidth: '700px' }}>
                <h2 className='text-center mb-4'>Generate a Lesson Plan</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='topicInput' className='form-label'>Topic</label>
                        <input
                            type='text'
                            id='topicInput'
                            className='form-control'
                            placeholder='Photosynthesis'
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='gradeInput' className='form-label'>Grade</label>
                        <input
                            type='text'
                            id='gradeInput'
                            className='form-control'
                            placeholder='6th Grade'
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='questionInput' className='form-label'>Main Question / Focus</label>
                        <textarea
                            id='questionInput'
                            className='form-control'
                            placeholder='What is photosynthesis?'
                            rows='3'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        ></textarea>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='objectiveInputs' className='form-label'>Learning Objectives</label>
                        <textarea
                            id='objectiveInputs'
                            className='form-control'
                            placeholder='Short description of photosynthesis'
                            rows='3'
                            value={objectives}
                            onChange={(e) => setObjectives(e.target.value)}
                        ></textarea>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='assessmentInput' className='form-label'>Assessment Goal</label>
                        <textarea
                            id='assessmentInput'
                            className='form-control'
                            placeholder='Ask a question about photosynthesis'
                            rows='3'
                            value={assessment}
                            onChange={(e) => setAssessment(e.target.value)}
                        ></textarea>
                    </div>

                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary' disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Plan'}
                        </button>
                    </div>
                </form>

                {/* Error / Success messages */}
                {error && <div className='alert alert-danger mt-3'>{error}</div>}
                {success && <div className='alert alert-success mt-3'>{success}</div>}
            </div>

            {/* Downward Scroll Icon */}
            {lessonPlan && (
                <div className='text-center mt-5'>
                    <p className='text-muted'>Scroll down to view your generated plan</p>
                    <FaArrowDown size={32} className='text-secondary' />
                </div>
            )}

            {/* Display Lesson Plan */}
            {lessonPlan && (
                <div className='lessonPlan mt-4 p-4 border rounded shadow-sm bg-light'>
                    <h3 className='mb-3'>Generated Lesson Plan</h3>
                    <ReactMarkdown>{lessonPlan}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default MainPage;
