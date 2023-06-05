const soap = require('soap');
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv').config()

// User functions(register, login and logout)
const { register_function, login_function, logout_function} = require('./controllers/userController')

// Book functions
const { sort_high_function, sort_low_function, author_function, modify_function, users_function, delete_function } = require('./controllers/bookController')

const port = process.env.PORT || 8000
const connectDB = require('./db')

connectDB()

// the service
const service = {
  LibraryService: {
    LibraryPort: {
      Login: login_function,
      Register: register_function,
      Logout: logout_function,
      SortHigh: sort_high_function,
      SortLow: sort_low_function,
      Author: author_function,
      Modify: modify_function,
      Users: users_function,
      Delete: delete_function
    }
  }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('LibrarySOAP is running');
})

// Launch the server and listen
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, service, xml);
  console.log("Check http://localhost:" + port + wsdl_path + "?wsdl to see if the service is working");
});
