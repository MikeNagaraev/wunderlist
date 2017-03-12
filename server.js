var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var favicon = require('serve-favicon')

require('./server/db/models/User');
require('./server/db/models/Category');
require('./server/config/passport');

var auth = require('./server/routes/auth');
var user = require('./server/routes/user');

mongoose.connect('mongodb://mikhail:123456789@ds151289.mlab.com:51289/wunderlist');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'app')));
app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth);
app.use('/', user);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
