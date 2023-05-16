const Post = require('../models/post');
const Comment = require('../models/comment');

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


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {


            await post.deleteOne();

            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

}