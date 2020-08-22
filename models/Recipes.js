const mongoose = require("mongoose");

const Recipes = new mongoose.Schema({
    name: String,
    image: String
})

module.exports = mongoose.model('Recipes', Recipes)