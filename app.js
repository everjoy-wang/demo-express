const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const recordRoutes = require("./routes/recordRoutes");
const loginRoutes = require("./routes/loginRoutes");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }))

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/records", recordRoutes);
app.use("/login", loginRoutes);

app.listen(8080, () => {
  console.log("http://127.0.0.1:8080");
});