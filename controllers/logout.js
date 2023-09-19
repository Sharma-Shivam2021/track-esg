exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out: " + err.message);
      res.status(500).json({ error: "Logout failed" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
};