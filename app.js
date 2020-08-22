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

app.get("/recipes", async(req, res) => {
 try {
  const recipes = await Recipes.find().lean()
  res.render("recipes", { recipes: recipes });
 } catch (error) {
   console.error(error)
 } 
});

app.get('/recipes/new', (req,res) => {
  res.render('new')
})

app.post('/recipes', async(req,res) => {
  try {
    const newRecipe = {
      name: req.body.name,
      image: req.body.image
    }

    await Recipes.create(newRecipe)
    res.redirect('/recipes')
    
  } catch (error) {
    console.error(err);
  }

})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
