var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../db/models/User');

var jwt = require('express-jwt');

var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});

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

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));


router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  var user = new User();
  console.log(req.body)

  user.local.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function(err) {
    if (err) {
      return next(err);
    }

    console.log(user)

    return res.json({
      token: user.generateJWT()
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
        token: user.generateJWT()
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
