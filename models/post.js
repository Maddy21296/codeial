const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,// this is used for email must be there for login or sinup
        unique: true // this is used for that every email should be unique in database

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // includes the array of ids of  all comments in the post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true // this is used to generate created & updated times
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;