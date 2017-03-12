var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var UserSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  facebook: {
    id: String
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

UserSchema.methods.setPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.generateHash = function(password) {}

UserSchema.methods.validPassword = function(password) {
  var truePassword = bcrypt.compare(password, this.password);
  return truePassword;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

module.exports = mongoose.model('User', UserSchema);
