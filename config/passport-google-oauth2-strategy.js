const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:env.google_client_id,
        clientSecret:env.google_client_secret,
        callbackURL:env.google_call_back_url,
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