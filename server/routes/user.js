var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Category = mongoose.model('Category');
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

router.param('category', function(req, res, next, id) {
  var query = Category.findOne({
    id: id
  });
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

router.get('/users/:user', function(req, res, next) {
  req.user.populate('categories', function(err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
})

router.delete('/users/:user', function(req, res, next) {
  User.remove(req.user, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user)
  })
})

router.put('/users/:user', function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      res.send(err);
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.save(function(err, user) {
      if (err) {
        res.status(500).send(err)
      }
      res.send(user);
    })
  })
})

router.get('/users/:user/categories', function(req, res, next) {
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

router.get('/users/:user/categories/:category', function(req, res, next) {
  res.json(req.category);
})

router.get('/categories', function(req, res, next) {
  Category.find(function(err, category) {
    if (err) {
      return next(err);
    }
    res.json(category);
  })
})

router.put('/users/:user/categories/:category', function(req, res, next) {
  Category.findOne({
    id: req.category.id
  }, function(err, category) {
    if (err) {
      res.send(err);
    }

    category.title = req.body.title || category.title;
    category.todos = req.body.todos || category.todos;

    category.save(function(err, category) {
      if (err) {
        res.status(500).send(err)
      }
      res.send(category);
    })
  })
})

router.delete('/users/:user/categories/:category', function(req, res, next) {
  Category.remove(req.category, function(err, category) {
    if (err) {
      res.send(err);
    }
    res.json(category)
  })
})

module.exports = router;
