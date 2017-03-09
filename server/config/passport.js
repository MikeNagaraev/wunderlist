var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport')

var User = require('../db/models/User');
var configAuth = require('./configAuth');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    process.nextTick(function() {
      User.findOne({
        'email': email
      }, function(err, user) {

        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            message: 'Incorrect email.'
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }

        return done(null, user);
      });
    })
  }
));

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          console.log('profile', user);
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;
            console.log('profile', newUser);
            return done(null, newUser);
          })
        }
      });
    });
  }

));
