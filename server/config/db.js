var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jarvo",
  database:'mobileapp',
  port:3306


});

connection.connect(function(err) {
  if(err){
    console.log('check your connections');
  }
  else{
    console.log("Db Connected!");
  }

});

module.exports = connection