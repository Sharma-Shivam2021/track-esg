const bcrypt = require("bcrypt");
const db = require("../configs/config");

exports.register = async (req, res) => {
  const { username, password, role, email } = req.body;
  const searchUser = "SELECT * FROM user_data WHERE username = ?";
  db.query(searchUser, [username], async (err, results) => {
    if (err) {
      console.error("Error Registering in: " + err.message);
      return res.status(500).json({ error: "Registration failed" });
    } else if (results.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO user_data (username, password, role,email) VALUES (?, ?, ?,?)";
      db.query(sql, [username, hashedPassword, role, email], (err, result) => {
        if (err) {
          console.error("Error registering user: " + err.message);
          res.status(500).json({ error: "Registration failed" });
        } else {
          res.status(200).json({ message: "Registration successful" });
        }
      });
    } else {
      res.status(500).json({ error: "User already exists" });
    }
  });
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  const sql = "SELECT * FROM user_data WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Error logging in: " + err.message);
      res.status(500).json({ error: "Login failed" });
    } else if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match && user.role === role) {
        req.session.userId = user.id;
        req.session.userRole = user.role;
        console.log(req.session.userId, req.session.userRole);
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(401).json({ error: "User not found" });
    }
  });
};
