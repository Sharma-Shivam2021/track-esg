const express = require("express");
const session = require("express-session");

const registerRoute = require('./routes/user-credential');
const logoutRoute = require('./routes/logout');
const adminRoute = require('./routes/admin');
const carpoolRoute = require("./routes/carpool");
const errorController = require("./controllers/error");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "secret-key", //change this to get more secure encryption
    resave: true,
    saveUninitialized: true,
  })
);

app.use(registerRoute);
app.use(logoutRoute);
app.use("/admin", adminRoute);
app.use("/carpool", carpoolRoute);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
