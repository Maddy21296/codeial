const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,// this is used for email must be there for login or sinup

    },
    // comment belongs to user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true // this is used to generate created & updated times
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;