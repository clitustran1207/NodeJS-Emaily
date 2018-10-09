const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy (
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // check if existing user's ID ?
            User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    //yes
                    done(null, existingUser);
                }
                else {
                    //no
                    new User ({ 
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.name.familyName + ' ' + profile.name.givenName 
                    })
                    .save()
                    .then(user => done(null, user));
                }
            });
        }
    )
);