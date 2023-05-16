const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req,res){
    // console.log(req.cookies); // this is used for requesting cookie value which is created in browser
    // res.cookie('user-id', 9494);// this is used for change cookie value which is created in browser

    try{
        let posts = await Post.find({})
        .populate('user') // this populate function is used to display all user's data with post
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});
        return res.render('home',{
            title : "Codeial | Home",
            posts : posts,
            all_users: users
        });
    }catch(err){
    console.log('Error', err);
    return;
    }

}
    

module.exports.partytime = function(req,res){
    return res.end('<h1>Party time is 9PM </h1>');
}