const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:'1082568207078-1c84n9al9mc6eqv601193ft4u9plfl9o.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:8000/users/auth/google/callback',
    },

    async function(accessToken, refreshToken, profile, done){
        // find a user
        let user = await User.findOne({email:profile.emails[0].value}).exec();

            console.log(profile);

            if(user){
                // if user found , set this user as req.user (req.user means signIn that user)
                return done(null,user);
            }else{
                // if not found , create the user in the system database & set it as req.user
                let user = await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null,user);
            }
    }

));


module.exports = passport;