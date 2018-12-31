const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const indexRoutes = require("./routes/indexRoute");
const userRoutes = require("./routes/userRoute");

//Initialize the app
const app = express();

//Passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Mongo DB connected`))
  .catch(err => console.error(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Connect Flash
app.use(flash());

//Globle vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", indexRoutes);
app.use("/users", userRoutes);

//Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`App is running on port ${PORT}`));
