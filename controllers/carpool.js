const util = require("util");
const db = require("../configs/config");

const queryAsync = util.promisify(db.query).bind(db);

exports.postCarpoolCreate = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      date,
      origin,
      destination,
      seatsAvailable,
      details,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !date ||
      !origin ||
      !destination ||
      !seatsAvailable ||
      !details
    ) {
      res.status(400).json({ error: "All fields must be provided" });
      return;
    } else {
      const query =
        "INSERT INTO carpool (name, phoneNumber, carpoolDate, origin, destination, seatsAvailable, details) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        name,
        phoneNumber,
        date,
        origin,
        destination,
        seatsAvailable,
        details,
      ];

      const results = await queryAsync(query, values);

      const carpoolRequestId = results.insertId;
      res.status(201).json({ id: carpoolRequestId });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getCarpoolSearch = async (req, res) => {
  try {
    const { date, origin, destination } = req.body;
    const query =
      "SELECT * FROM carpool WHERE carpoolDate = ? AND origin = ? AND destination = ?";
    const values = [date, origin, destination];

    const results = await queryAsync(query, values);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCarpool = async (req, res) => {
  try {
    const query = "SELECT * FROM carpool";

    const results = await queryAsync(query);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCarpool = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM carpool WHERE carpoolId = ?";
    const result = await queryAsync(query, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    res.status(200).json({ message: "Entry Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
