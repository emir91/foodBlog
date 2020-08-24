const mongoose = require("mongoose");

const Recipes = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

module.exports = mongoose.model('Recipes', Recipes)