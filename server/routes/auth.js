var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../db/models/User');

//
// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }));
//
// router.post('/register', passport.authenticate('local-signup', {
//   successRedirect: '/home',
//   failureRedirect: '/register'
// }));

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/auth/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    console.log('user', user)
    if (user) {
      return res.json({
        user: user
      });
    }
  })(req, res, next);
});


router.post('/register', function(req, res, next) {
  if (!req.body.name || !req.body.password || !req.body.email) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (user) {
      return res.status(400).json({
        message: 'Email is already been taken'
      });
    }
  })

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password)

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    var token = user.generateJWT()
    return res.json({
      user: user,
      token: token
    })
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  console.log('preauth', req.body)

  passport.authenticate('local', function(err, user, info) {
    console.log('auth user',user)

    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({
        user: user,
        token: user.generateJWT()
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
