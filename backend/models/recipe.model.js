 const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const recipeSchema = new Schema({
     Title : { type: 'string', required: true},
     Ingredients : [{ IngredientName: { type: 'string', required: true}, IngredientAmount: { type: 'string', required: true}}],
     Instructions : { type: 'string', required: true},

 },
 {
    Image : { data: Buffer, contentType: String },
 
 },
 
 {
    timestamps: true
 });

 const Recipe = mongoose.model('Recipe' , recipeSchema);

 module.exports = Recipe;