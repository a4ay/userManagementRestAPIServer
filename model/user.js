const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    
    name:{
        type : String,
        required : true
    },
    profile:{
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('User',userSchema)