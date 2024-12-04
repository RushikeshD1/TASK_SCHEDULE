const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle : {
        type : String,
        required : true,        
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    status : {
        type : String,
        enum : ['scheduled','completed', 'failed'],
        default : 'scheduled'
    },
    cronSchedule : {
        type : String,
        required : true
    }   
},
    {timestamps : true}
)

const User = mongoose.model('User', jobSchema); 

module.exports = User;