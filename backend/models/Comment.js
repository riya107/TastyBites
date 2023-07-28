const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentor_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    commentor_name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = commentSchema;

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {commentSchema, Comment};