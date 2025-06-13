import './index.css';
import { useState} from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


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

            const response = await axios.post(url, { prompt, topic, grade }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

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
                        className='border border-gray-300 p-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2>Generated Lesson Plan</h2>
                            
                        </div>
                        <div>
                            <ReactMarkdown>{lessonPlan}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainPage;