var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Category = mongoose.model('Category');

router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function(err, category) {
    if (err) {
      return next(err);
    }
    if (!category) {
      return next(new Error('can\'t find category'));
    }
    req.category = category;
    return next();
  })
})

router.get('/categories/:category', function(req, res, next) {
  req.category.populate('todos', function(err, category) {
    if (err) {
      return next(err);
    }
    res.json(category);
  })
})
