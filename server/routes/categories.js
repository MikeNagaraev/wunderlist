var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var categories = require('./categories');

var Category = mongoose.model('Category');
var Todo = mongoose.model('Todo');

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

router.get('/categories', function(req, res, next) {
  Category.find(function(err, category) {
    if (err) {
      return next(err);
    }
    res.json(category);
  })
})

router.delete('/categories/:category', function(req, res, next) {
  Category.remove(req.category, function(err, category) {
    if (err) {
      res.send(err);
    }
    res.json(category)
  })
})

router.post('/categories', function(req, res, next) {
  var category = new Category(req.body);
  category.save(function(err, category) {
    if (err) {
      return next(err);
    }

    res.json(category);
  })
})

router.post('/categories/:category/todos', function(req, res, next) {
  var todo = new Todo(req.body);
  todo.category = req.category;
  todo.save(function(err, todo) {
    if (err) {
      return next(err);
    }
    req.category.todos.push(todo);
    req.category.save(function(err, category) {
      if (err) {
        return next(err);
      }
      res.json(todo);
    })
  })
})

router.param('todo', function(req, res, next, id) {
  var query = Todo.findById(id);

  query.exec(function(err, todo) {
    if (err) {
      return next(err);
    }
    if (!todo) {
      return next(new Error('can\'t find todo'));
    }
    req.todo = todo;
    return next();
  })
})

router.delete('/categories/:category/todos/:todo', function(req, res, next) {
  Todo.remove(req.todo, function(err, todo) {
    if (err) {
      res.send(err)
    }
    var deleteId;
    req.category.todos.forEach((el, index) => {
      if (el._id === req.todo._id) {
        deleteId = index;
      }
    })
    req.category.todos.splice(deleteId, 1)
    res.json({
      message: 'Successfully deleted',
      id: req.todo._id
    })
  })
})



module.exports = router;
