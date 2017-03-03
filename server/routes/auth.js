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
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  var user = new User();
  user.local.username = req.body.username;

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
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  passport.authenticate('local', function(err, user, info) {
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
