const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,// this is used for email must be there for login or sinup
        unique: true // this is used for that every email should be unique in database

    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;