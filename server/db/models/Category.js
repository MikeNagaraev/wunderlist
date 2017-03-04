var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  title: String,
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

mongoose.model('Category', CategorySchema);
