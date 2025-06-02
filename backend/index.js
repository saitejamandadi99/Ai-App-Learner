const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(()=>{
    console.log('MongoDB connected ')
})
.catch(e=>{
    console.error('Error Occured while connecting to MongoDB: ', e)
})

app.get('/', (req,res)=>{
    res.send('Application is running in the backend. ')
})
app.use('/api/users', require('./routes/authRoutes'));
app.listen(port, ()=>{
    console.log(`Application is running on http://localhost:${port}`)
})



