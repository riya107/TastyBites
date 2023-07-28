const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      recipes: {
        type: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Recipe",
          },
        ],
        default: [],
      },
      rated_recipes: {
        type: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Recipe",
          },
        ],
        default: [],
      },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  module.exports = User;