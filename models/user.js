const mongoose = require('mongoose');

const multer = require('multer');// declaring multer to access multipart of uploading files
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars'); // path where we are going to store in server

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
    },
    avatar:{
        type: String // field which will be storing the path of the file coz database just stores the path of file not complete file
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;