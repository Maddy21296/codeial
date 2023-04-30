const User = require('../models/user');


module.exports.profile = async (req, res) =>{
     try{
          if(req.cookies.user_id){
               const user = await User.findById(req.cookies.user_id);
               if(user){
                    return res.render('user_profile', {
                         title: "User Profile",
                         user: user
                    });
               }
          }
          else{
               return res.redirect('/users/sign-In');
          }

     } catch(err){
          console.log('error in creating user');
          return;
     }
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
module.exports.create = async (req, res)=>{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // finding one email id is present in DB already or not
    const user = await User.findOne({email: req.body.email});
     if(!user) {
          try {
               User.create(req.body);
               return res.redirect('/users/sign-In');
          }
          catch(err) {
               console.log('error in creating user');
               return;
          } 
     }
     else {
          return res.redirect('back');
     }
}



// get the sign in  session for user
module.exports.create_session = async (req, res)=>{
    // steps to authenticate

    // find the user
    const user = await User.findOne({email: req.body.email});
     //handle user found
     if(user) {
          try {
               //handle password which don't match
               if(user.password != req.body.password){
                    return res.redirect('back');
               }
               //handle session creation
               res.cookie('user_id', user.id);
               return res.redirect('/users/profile');
          }
          catch(err) {
               console.log('error in creating user');
               return;
          } 
     }
     //handle user not found
     else {
          return res.redirect('/users/sign-Up');
     }
    
    }