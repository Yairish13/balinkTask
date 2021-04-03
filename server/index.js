const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const app = express();

//Here is the connection to the cloud DB AWS
//usually inserting the password into .env files or from the secured database but here for the task ill do something random
const db = mysql.createConnection({
  host: "balink-database.ckw7ejg6bise.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "yair41098",
  database: "balink",
  multipleStatements: true,
});

db.connect((error) => {
  if (error) console.log(error.message);
  else console.log("mySQL connected");
});
module.exports = db;




//A function that check if the token we got in the header is a valid token
 function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "password123", (err, user) => {
    if (err) {console.log(err); return res.sendStatus(403);}
    req.user = user;
    next();
  });
}
module.exports.authenticateToken = authenticateToken ;


//the routes and the authentication for each route
app.use(express.json());

app.use('/api', require('./routes'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});

module.exports = app ;
