var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var UserSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

UserSchema.methods.setPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.generateHash = function(password) {
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  console.log('username', this.local)

  return jwt.sign({
    _id: this._id,
    username: this.local.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

module.exports = mongoose.model('User', UserSchema);
