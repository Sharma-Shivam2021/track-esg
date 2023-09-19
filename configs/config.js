const mysql = require("mysql");
const db = mysql.createConnection({
  // use your own databse configuration
  host: "localhost",
  user: "shivam",
  password: "2571",
  database: "user_authentication",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;