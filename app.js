const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/recipes", (req, res) => {
  res.render("recipes");
});

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
