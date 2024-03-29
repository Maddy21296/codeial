const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// authentication using passport
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
      },
      async function(req,email, password, done) {
        try {
          const user = await User.findOne({ email: email });
          if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          req.flash('error','Error in finding user --> Passport');
          return done(err);
        }
      }
    )
  );


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });


// check if the user is authenticated 
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in , then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect('/users/SignIn');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the signed in user from the session  cookie & we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;