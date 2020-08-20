const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/recipes", (req, res) => {
  const recipes = [
    {
      name: "Pizza Napolitana",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Homemade Burger",
      image:
        "https://images.unsplash.com/photo-1496930666207-e76e8253a950?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },

    {
      name: "Veggy Pasta",
      image:
        "https://images.unsplash.com/photo-1587206668283-c21d974993c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ];
  res.render("recipes", { recipes: recipes });
});

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
