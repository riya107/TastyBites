const express = require("express");

const User = require("../models/User");
const {Comment} = require("../models/Comment");
const Recipe = require("../models/Recipe");
const { restrict, uploadInFirebase } = require("../middlewares/middleware");
const multer = require("multer");

const router = express.Router();
const {getNewRating} = require('../utils');
const upload = multer();

router.post(
  "/publishRecipe",
  restrict,
  upload.single("picture"),
  uploadInFirebase,
  async (req, res) => {
    try {
      const recipe = new Recipe({
        recipe_name: req.body.recipeName,
        category: req.body.category,
        subcategory: req.body.subcategory,
        creator_id: req._id,
        creator_name: req.name,
        ingredients: JSON.parse(req.body.ingredients),
        summary: req.body.summary,
        method: req.body.method,
        image_url: req.image_url,
      });
      await recipe.save();
      await User.findByIdAndUpdate(
        { _id: req._id },
        { $push: { recipes: { $each: [recipe._id], $position: 0 } } }
      );
      return res
        .status(201)
        .json({ success: true, message: "process successful" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "process failed" });
    }
  }
);

router.post("/fetchRecipesByFilter", async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    const filter = { category, subcategory };
    if (subcategory === "") {
      delete filter.subcategory;
    }
    const recipes = await Recipe.find(filter);
    return res
      .status(200)
      .json({ success: true, data: recipes, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { text } = req.body;
    const searchQuery = {
      $or: [
        { recipe_name: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
        { subcategory: { $regex: text, $options: "i" } },
        { creator_name: { $regex: text, $options: "i" } },
        { summary: { $regex: text, $options: "i" } },
      ],
    };
    const recipes = await Recipe.find(searchQuery);
    return res
      .status(200)
      .json({ success: true, data: recipes, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { text } = req.body;
    const searchQuery = {
      $or: [
        { recipe_name: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
        { subcategory: { $regex: text, $options: "i" } },
        { creator_name: { $regex: text, $options: "i" } },
        { summary: { $regex: text, $options: "i" } },
      ],
    };
    const recipes = await Recipe.find(searchQuery);
    return res
      .status(200)
      .json({ success: true, data: recipes, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/comment", restrict, async (req, res) => {
  try{
    const {recipe_id} = req.body;
    const {comment} = req.body;
    const newComment = new Comment({
      commentor_id:req._id,
      commentor_name:req.name,
      comment:comment
    })
    await Recipe.findByIdAndUpdate(
      { _id: recipe_id },
      { $push: { comments: { $each: [newComment], $position: 0 } } }
    );
    return res
      .status(200)
      .json({ success: true, message: "process successful" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/fetchRecipe", async (req, res) => {
  try{
    const {recipe_id} = req.body;
    const recipe = await Recipe.findById({_id:recipe_id});
    return res
      .status(200)
      .json({ success: true, data: recipe, message: "process successful" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/ratedByMe", restrict, async (req, res)=>{
  try{
    const {recipe_id} = req.body;
    const user = await User.findById({_id:req._id});
    if(user.rated_recipes.includes(recipe_id)){
      return res
      .status(200)
      .json({ success: true, data: true, message: "process successful" });
    }
    else{
      return res
      .status(200)
      .json({ success: true, data: false, message: "process successful" });
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.post("/rateRecipe", restrict, async (req, res) => {
  try{
    const {recipe_id, rating} = req.body;
    const recipe = await Recipe.findById({_id:recipe_id});
    const oldRating = recipe.rating;
    const ratingCount = recipe.rating_count;
    const newRating = getNewRating(oldRating, ratingCount, rating);

    await Recipe.findByIdAndUpdate({_id:recipe_id},{rating:newRating, rating_count:ratingCount+1});

    await User.findByIdAndUpdate(
      { _id: req._id },
      { $push: { rated_recipes: { $each: [recipe._id], $position: 0 } } }
    );

    return res
      .status(200)
      .json({ success: true, data: recipe, message: "process successful" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});


router.post("/fetchPopular", async (req, res) => {
  try{
    const {ids} = req.body;
    const recipes = await Recipe.find({_id:{ $in: ids }});

    return res
      .status(200)
      .json({ success: true, data: recipes, message: "process successful" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.get("/fetchMyRecipes", restrict, async (req, res) => {
  try{
    const user = await User.findById({_id:req._id}).populate('recipes').exec();
    return res
      .status(200)
      .json({ success: true, data: user.recipes, message: "process successful" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.delete("/deleteRecipe/:recipe_id", restrict, async (req, res) => {
  try{
    const {recipe_id} = req.params;
    const recipe = await Recipe.findById({_id:recipe_id});
    if(recipe.creator_id.toString()===req._id){
      await Recipe.findByIdAndDelete({_id:recipe_id});
      await User.updateOne({_id:req._id}, { $pull: { recipes: recipe_id } });
      return res
      .status(200)
      .json({ success: true, message: "process successful" });
    }
    else {
      console.log(error);
      return res.status(401).json({ success: false, message: "not allowed" });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "process failed" });
  }
});

router.delete("/deleteRecipe", restrict, async (req, res) => {});

router.patch("/updateRecipe", restrict, async (req, res) => {});

module.exports = router;
