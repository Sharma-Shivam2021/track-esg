const db = require("../configs/config");

exports.postCarpoolCreate = (req, res) => {
  const { date, origin, destination, seatsAvailable, details } = req.body;
  const query =
    "INSERT INTO carpool (carpoolDate, origin, destination, seatsAvailable, details) VALUES (?, ?, ?, ?, ?)";
  const values = [date, origin, destination, seatsAvailable, details];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      const carpoolRequestId = results.insertId;
      res.status(201).json({ id: carpoolRequestId });
    }
  });
};

exports.getCarpoolSearch = (req, res) => {
  const { date, origin, destination } = req.body;
  const query =
    "SELECT * FROM carpool WHERE carpoolDate = ? AND origin = ? AND destination = ?";
  const values = [date, origin, destination];

  db.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
};
