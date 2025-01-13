const express = require("express");

const postRouter = express.Router();

const {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

postRouter.route("/").post(createPost).get(getAllPost);
postRouter.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);

module.exports = postRouter;
