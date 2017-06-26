require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/database');
var routes = require('./api/routes');

// Define the port to run on
// Change with config later.
app.set('port', 3000);

// Add middleware to console log every request
app.use(morgan('dev'));

// CORS Middleware
app.use(cors());

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api', routes);

// Authentication with Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

var users = require('./api/routes/users')

app.use('/users', users);

// app.get('*', function(req, res) {
//   res.sendfile('./public/index.html')
// })

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening on port', port);
});
