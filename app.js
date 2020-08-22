const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

//Load config
dotenv.config({path: './config/config.env'})

connectDB()

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

const Recipes = require('./models/Recipes')

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
  {
    name: "Veggy Pasta",
    image:
      "https://images.unsplash.com/photo-1587206668283-c21d974993c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  }
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/recipes", (req, res) => {
  
  res.render("recipes", { recipes: recipes });
});

app.get('/recipes/new', (req,res) => {
  res.render('new')
})

app.post('/recipes', (req,res) => {
  const newRecipe = {
    name: req.body.name,
    image: req.body.image
  }
  
  recipes.push(newRecipe)
  res.redirect('/recipes')

})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
