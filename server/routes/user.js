var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var categories = require('./categories');

var Category = mongoose.model('Category');
var Todo = mongoose.model('Todo');
var User = mongoose.model('User');

router.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('can\'t find user'));
    }
    req.user = user;
    return next();
  })
})

router.get('/users/:user', function(req, res, next) {
  req.user.populate('categories', function(err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
})

router.delete('/user/:user', function(req, res, next) {
  User.remove(req.user, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user)
  })
})

router.get('user/:user/categories', function(req, res, next) {
  Category.find(function(err, category) {
    if (err) {
      return next(err);
    }
    res.json(category);
  })
})

router.post('/users/:user/categories', function(req, res, next) {
  var category = new Category(req.body);
  category.user = req.user;
  category.save(function(err, category) {
    if (err) {
      return next(err);
    }
    req.user.categories.push(category);
    req.user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      res.json(category);
    })
  })
})
