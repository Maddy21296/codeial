const User = require('../models/user');



module.exports.profile = async function(req, res){
  let users = await User.findById(req.params.id)
      return res.render('user_profile', {
          title: 'User Profile',
          profile_user: users
      });
  };


module.exports.update = async function(req,res){
//   if(req.user.id == req.params.id){
//     try{
//       let user = await User.findByIdAndUpdate(req.params.id,req.body);
      
//         return res.redirect('back');
      
//     }catch(err){
//       req.flash('error', err);
//       return res.redirect('back');
//     }
//   }else{
//     req.flash('error', 'Unauthorized!');
//     return res.status(401).send('Unauthorized');
// }
// }
if(req.user.id == req.params.id){

  try{

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
          if (err) {console.log('*****Multer Error: ', err)}
          
          user.name = req.body.name;
          user.email = req.body.email;

          if (req.file){

              // if (user.avatar){
              //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
              // }


              // this is saving the path of the uploaded file into the avatar field in the user
              user.avatar = User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect('back');
      });

  }catch(err){
      req.flash('error', err);
      return res.redirect('back');
  }


}else{
  req.flash('error', 'Unauthorized!');
  return res.status(401).send('Unauthorized');
}
}




// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}

// get the sign up data
module.exports.create = async function(req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
      }
  
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        const userCreate = await User.create(req.body);
        return res.redirect('/users/SignIn');
      } else {
        req.flash('success', 'You have signed up, login to continue!');
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in signing up:', err);
      return;
    }
  };



// get the sign in  session for user
module.exports.create_session = function(req, res){
    // TODO later
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Signed out Successfully");
    return res.redirect("/users/SignIn");
  });
}