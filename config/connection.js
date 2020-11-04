const mysql = require('mysql2');
let connection;

if (process.env.NODE_DB_ENV === 'production') {
  connection = mysql.createConnection(process.env.JAWSDB_URL).promise();
  console.log("connected to jaws database");  
}
else{
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fwitter_db',
  }).promise();
}
module.exports = connection;
