exports.adminDashboard = (req, res) => {
  if (req.session.userId && req.session.userRole === "admin") {
    res.status(200).json({ message: "Welcome to the admin dashboard" });
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};