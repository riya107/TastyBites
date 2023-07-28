const mongoose = require("mongoose");

const {commentSchema} = require("./Comment");

const recipeSchema = new mongoose.Schema(
    {
      recipe_name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      subcategory: {
        type: String,
        required: true,
      },
      creator_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      creator_name: {
        type: String,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      ingredients: {
        type: [String],
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 5,
      },
      rating_count: {
        type: Number,
        default: 0,
      },
      comments: {
        type: [commentSchema],
        default: []
      }
    },
    { timestamps: true }
  );
  
  const Recipe = mongoose.model("Recipe", recipeSchema);
  module.exports = Recipe;