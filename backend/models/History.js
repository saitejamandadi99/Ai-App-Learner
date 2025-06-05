const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    topic:{
        type:String, 
        required:true
    },
    grade:{
        type:String,
        required:true,
    },
    lessonPlan:{
        type:String,        
        required:true,
    }
})

module.exports = mongoose.model('History', historySchema);