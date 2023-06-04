
var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
  /* 
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  var login_args = {
    email: "test@gmail.com",
    password: "password"
  };
  var register_args = {
    name: "Test",
    email: "test@gmail.com",
    password: "password"
  };
  var logout_args = {
    token: "token"
  };


  // call the service
  
  // Login Test
  client.Login(login_args, function (err, res) {
    if (err)
      throw err;
    console.log(res); 
  });
  
  // Register Test
  client.Register(register_args, function (err, res) {
    if (err)
    throw err;
    console.log(res); 
  });

  // Logout Test
  client.Logout(logout_args, function (err, res) {
    if (err)
    throw err;
    console.log(res); 
  });

});