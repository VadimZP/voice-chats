'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config');
var middleware = require('./middleware');

var HandlerGenerator = function () {
  function HandlerGenerator() {
    _classCallCheck(this, HandlerGenerator);
  }

  _createClass(HandlerGenerator, [{
    key: 'login',
    value: function login(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;
      // For the given username fetch user from DB

      var mockedUsername = 'admin';
      var mockedPassword = 'password';

      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          var token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' });
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
  }, {
    key: 'index',
    value: function index(req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
  }]);

  return HandlerGenerator;
}();

// Starting point of the server


function main() {
  var app = express(); // Export app for other routes to use
  var handlers = new HandlerGenerator();
  var port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/', middleware.checkToken, handlers.index);
  app.listen(port, function () {
    return console.log('Server is listening on port: ' + port);
  });
}

main();