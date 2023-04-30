const User = require('../models/user');



module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "User Profile"
    });
}

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, async function(err,user){
        if (err){console.log('Error in finding user in signing up');return}
        if(!user){
            let userCreate = await User.create(req.body, async function(err,user){
                if (err){
                    console.log('Error in finding user while signing up');return}
                    
                return res.redirect('/users/SignIn');
            })
        }else{
            return res.redirect('back');
        }
    });
}



// get the sign in  session for user
module.exports.create_session = function(req, res){
    // TODO later
}