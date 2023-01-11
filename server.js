const soap = require('soap');
const express = require('express');
const fs = require('fs');
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('./models/userModel')
const Book = require('./models/bookModel')
const Lending = require('./models/lendingModel')

const port = process.env.PORT || 8000
const connectDB = require('./db')

connectDB()

login_function = asyncHandler( async(args) => {
    console.log('login_function');
    var email = args.email;
    var password = args.password;

    const user = await User.findOne({email})

    // Од коментирај ја оваа линија кога ќе биде готова цела програма

    // if(user.token == ""){
    //     await User.findByIdAndUpdate(user._id, {token: generateToken(user._id)}, {new: true})
    // }

    if(user && (await bcrypt.compare(password, user.password))){
      var result = "Sucess your token is: " + user.token
    }else{
      var result = 'Wrong email or password'
    }

    return { 
      result: result
    }
})

// the service
var serviceObject = {
  LoginService: {
        LoginServiceSoapPort: {
            Login: login_function
        },
        LoginServiceSoap12Port: {
            Login: login_function
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
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
