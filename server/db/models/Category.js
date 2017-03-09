var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  title: String,
  id: String,
  todos: [{
    title: String,
    priority: String,
    createdAt: Date,
    expiredAt: Date,
    done: {
      type: Boolean,
      default: false
    }
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Todo'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

mongoose.model('Category', CategorySchema);
