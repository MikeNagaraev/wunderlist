var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  priority: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

mongoose.model('Todo', TodoSchema);
