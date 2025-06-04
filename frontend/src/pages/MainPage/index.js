import './index.css';
import { useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const MainPage = () => {
    const [topic, setTopic] = useState('');
    const [grade, setGrade] = useState('');
    const [question, setQuestion] = useState('');
    const [objectives, setObjectives] = useState('');
    const [assessment, setAssessment] = useState('');
    const [lessonPlan, setLessonPlan] = useState(''); // Stores the final lesson plan from AI
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false); // Renamed from 'loading' for consistency
    const [success, setSuccess] = useState('');
    // Removed redundant aiResponse state

    const prompt = `You are an AI teacher. Create a Lesson Plan based on the following inputs:
    Topic: ${topic}, Grade: ${grade}, Question: ${question || `explain everything about ${topic}`}, Learning Objectives: ${objectives || `Provide a short description of ${topic}`}, Assessment: ${assessment || `ask me a question on this ${topic} `}.
    Provide a detailed lesson plan that includes objectives, materials needed, activities, and assessment methods.
    Please format the output using Markdown for clear headings, bullet points, etc.`; 

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

            const response = await axios.post(url, { prompt }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.lessonPlan) {
                setLessonPlan(response.data.lessonPlan);
                setSuccess('Lesson plan generated successfully!');
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
            setTopic('');
            setGrade('');
            setQuestion('');
            setObjectives('');
            setAssessment('');
        }
    };

    return (
        <>
            <div className='mainPage'>
                <h1>Welcome to the AI APP LEARNER</h1>
                <p>This is the main content area where you can access various features of the application.</p>
                <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
                    <h2>Generate a Lesson Plan</h2>
                    <label htmlFor='topicInput'>Topic</label>
                    <input
                        type='text'
                        placeholder='Photosynthesis'
                        id='topicInput'
                        required
                        onChange={(e) => setTopic(e.target.value)}
                        value={topic}
                    />
                    <label htmlFor='gradeInput'>Grade</label>
                    <input
                        type='text'
                        placeholder='6th Grade'
                        id='gradeInput'
                        required
                        onChange={(e) => setGrade(e.target.value)}
                        value={grade}
                    />
                    <label htmlFor='questionInput'>Question / Main Topic</label>
                    <textarea placeholder='what is photosynthesis?' id='questionInput' onChange={(e) => setQuestion(e.target.value)} value={question} rows="4"></textarea>
                    <label htmlFor='objectiveInputs'>Learning Objectives</label>
                    <textarea placeholder='Short description of photosynthesis' id='objectiveInputs' onChange={(e) => setObjectives(e.target.value)} value={objectives} rows="4"></textarea>
                    <label htmlFor='assessmentInput'>Assessment</label>
                    <textarea placeholder='ask a question about photosynthesis' id='assessmentInput' onChange={(e) => setAssessment(e.target.value)} value={assessment} rows="4"></textarea>
                    <p>Click the button below to generate a lesson plan based on the inputs provided.</p>
                    <button type="submit" id='generateButton' disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                </form>
                
                {error && <div className='alert alert-danger mt-3 text-center'>{error}</div>}
                {success && <div className='alert alert-success mt-3 text-center'>{success}</div>}

                {lessonPlan && (
                    <div className='lessonPlan mt-4 p-3 border rounded shadow-sm bg-light'>
                        <h2>Generated Lesson Plan</h2>
                        
                        <ReactMarkdown>{lessonPlan}</ReactMarkdown>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;