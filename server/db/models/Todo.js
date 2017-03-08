var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  priority: String,
  createdAt: Date,
  expiredAt: Date,
  done: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

mongoose.model('Todo', TodoSchema);
