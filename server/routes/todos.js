var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo');

router.get('/todos', function(req, res, next) {
  Todo.find(function(err, todos) {
    if (err) {
      return next(err);
    }
    res.json(todos);
  })
})

router.post('/todos', function(req, res, next) {
  var todo = new Todo(req.body);
  todo.save(function(err, todo) {
    if (err) {
      return next(err);
    }
    res.json(todo);
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

router.delete('/todos/:todo', function(req, res, next) {
  Todo.remove(req.todo, function(err, todo) {
    if (err) {
      res.send(err)
    }
    res.json({
      message: 'Successfully deleted',
      id: req.todo._id
    })
  })
})


module.exports = router;
