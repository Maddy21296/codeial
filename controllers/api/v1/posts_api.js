const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user') // this populate function is used to display all user's data with post
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }   
        });

        return res.json(200,{
            message:'Lists of posts',
            posts:posts
        });

    }catch(err){
        console.log('Error', err);
        return;
        }    

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {


            await post.deleteOne();

            await Comment.deleteMany({ post: req.params.id });

            // if (req.xhr){
            //     // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            //     post = await post.populate('user', 'name').execPopulate();



            return res.json(200,{
                message:'The post & associated comments deleted successfully!'
            });

        } else {
            return res.json(401,{
                message:'You can not delete this post'
            });
        }

    } catch (err) {
        console.log('**********',err);
        return res.json(500,{
            message:'Internal server error'
        });
    }

}
