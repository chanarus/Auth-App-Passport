const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const indexRoutes = require("./routes/indexRoute");
const userRoutes = require("./routes/userRoute");

//Initialize the app
const app = express();

//DB Config
const db = require("./config/keys").MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Mongo DB connected`))
  .catch(err => console.err(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/", indexRoutes);
app.use("/users", userRoutes);

//Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`App is running on port ${PORT}`));
