const Post = require('../models/post')

module.exports.create = async (req, res) => {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        // req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}