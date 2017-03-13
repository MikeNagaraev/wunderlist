var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  title: String,
  id: String,
  todos: [{
    title: String,
    priority: String,
    createdAt: String,
    expiredAt: String,
    done: {
      type: Boolean,
      default: false
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

mongoose.model('Category', CategorySchema);
