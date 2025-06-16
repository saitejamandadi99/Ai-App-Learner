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

    const prompt = `
            You are a helpful AI tutor assisting a student in learning.

            Generate a two-part output IN **MARKDOWN FORMAT** so it displays cleanly in a Markdown renderer (headings, bold, bullet points, code blocks, etc.).

            ---

            ## Understanding ${topic}

            **Topic:** ${topic}  
            **Grade Level:** ${grade}  
            **Main Focus / Student’s Question:** ${question}  
            **Learning Goals:** ${objectives}

            ---

            ## Part 1: Study Roadmap / Lesson Plan

            **Key Learning Objectives (Rephrased & Clear):**

            * Break down ${objectives} into concise, age-appropriate bullet points that are measurable and achievable at the ${grade} level.

            **Suggested Learning Flow:**

            1. **Introduction (15 min):** Recommend a short video or describe what an intro should include to build curiosity around ${topic}.
            2. **Core Concepts (45 min):** Explain key terms and definitions, and suggest reading material (or generate a concise lesson if no text exists).
            3. **Concept Application (30 min):** Recommend exercises or tasks that help apply the concepts practically.
            4. **Visual Reinforcement (15 min):** Suggest diagrams or analogies that help students visualize ${topic}.
            5. **Self-Assessment (15 min):** Ask one practice question related to ${topic}, and encourage the student to revisit unclear areas.
            6. **Optional Exploration:** Encourage looking into real-life examples or related experiments.

            **Activities/Checkpoints:**

            - Take structured notes  
            - Complete practice tasks or quiz  
            - Create a diagram or summary chart  
            - Answer the self-assessment question  
            - Discuss with a peer or mentor

            **Time Estimate:** Approx. 2 hours (can be adjusted)

            **Bonus Visual Aid or Analogy Example:**

            *If topic is Photosynthesis:*  
            "Imagine a plant as a solar-powered kitchen turning air and water into sugar."

            ---

            ## Part 2: Lesson Summary / Explanation

            **Engaging Introduction:**

            Hey there, curious learner! Ready to dive into ${topic}? It’s more fascinating than you think—let’s explore!

            **Core Concepts Explained:**

            Provide a clear and engaging explanation of the ${topic}, aligned with ${grade} level, using simple analogies where possible. Include step-by-step logic if it’s a process or a cause-effect structure if it's a concept.

            **Key Terms Glossary:**

            List and explain key terms relevant to ${topic}, using age-appropriate definitions.

            **Summary:**

            Give a brief summary that wraps up the main points from above. Reinforce how ${topic} connects to real-world applications or why it matters.

            **Practice Question:**

            Ask one thoughtful question related to ${topic} that checks understanding of the learning objectives.`;


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
