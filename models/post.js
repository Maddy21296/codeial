const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,// this is used for email must be there for login or sinup
        unique: true // this is used for that every email should be unique in database

    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true // this is used to generate created & updated times
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;