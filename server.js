var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

require('./server/db/models/Todo');
require('./server/db/models/User');
require('./server/db/models/Category');

var index = require('./server/routes/index');
var todos = require('./server/routes/todos');
var categories = require('./server/routes/categories');

mongoose.connect('mongodb://mikhail:123456789@ds151289.mlab.com:51289/wunderlist');

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));

app.use('/', index);
app.use('/', todos);
app.use('/', categories);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
