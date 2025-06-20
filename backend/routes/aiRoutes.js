const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const authMiddleware = require('../middleware/authMiddleware');
const History = require('../models/History'); 
const router  = express.Router();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log('AI Model initialized successfully', model);    

router.post('/generate', authMiddleware, async (req, res)=>{
    const {prompt, topic, grade} = req.body;
    if(!prompt){
        return res.status(400).json({message:'Prompt is required to generate a lesson plan.'});
    }
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        if (!text) {
            return res.status(500).json({message: 'Failed to generate lesson plan. Please try again.'});
        }
        const historyEntry = new History({
            userId: req.user._id,
            topic:topic,
            grade:grade,
            lessonPlan:text
        })
        await historyEntry.save();
        res.status(200).json({message:'Lessson plan generated successfully',lessonPlan: text});
    } catch (error) {
        console.error('Error generating lesson plan:', error);
        if (error.response) {
            return res.status(500).json({message: error.response.data.message || 'Failed to generate lesson plan. Please try again.'});
        } else if (error.request) {
            return res.status(500).json({message: 'Cannot connect to the AI service. Please check your network connection or try again later.'});
        } else {
            return res.status(500).json({message: 'An unexpected error occurred. Please try again.'});
        }
        
    }
})

router.get('/history', authMiddleware, async(req, res)=>{
    try{
        const history = await History.find({userId: req.user._id}).sort({createdAt:-1}) // sorted by creation date in descending order
        res.status(200).json({message: 'History fetched successfully', history: history});

    }
    catch(error){
        console.error('Error fetching history:', error);
        if (error.response) {
            return res.status(500).json({message: error.response.data.message || 'Failed to fetch history. Please try again.'});
        } else if (error.request) {
            return res.status(500).json({message: 'Cannot connect to the server. Please check your network connection or try again later.'});
        } else {
            return res.status(500).json({message: 'An unexpected error occurred. Please try again.'});
        }
    }   
})

module.exports = router