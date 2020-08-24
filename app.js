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



app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - show all recipes
app.get("/recipes", async(req, res) => {
 try {
  const recipes = await Recipes.find().lean()
  res.render("recipes", { recipes: recipes });
 } catch (error) {
   console.error(error)
 } 
});

//NEW - show form for adding new recipe
app.get('/recipes/new', (req,res) => {
  res.render('new')
})

//POST - adding new recipe to DB
app.post('/recipes', async(req,res) => {
  try {
    const newRecipe = {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description
    }

    await Recipes.create(newRecipe)
    res.redirect('/recipes')
    
  } catch (error) {
    console.error(err);
  }

})

//SHOW - show info about particular recipe
app.get('/recipes/:id', async(req,res) => {
  try {
    const recipe = await Recipes.findById({_id: req.params.id}).lean()

    res.render('show', {recipe})
    
  } catch (error) {
    console.error(error)
  }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
