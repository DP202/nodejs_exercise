const express = require("express");

const postRouter = express.Router();

const {
  createPost,
  getAllPosts,
  getPostDetail,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");

postRouter.route("/").post(createPost).get(getAllPosts);

postRouter
  .route("/:id")
  .get(getPostDetail)
  .delete(deletePost)
  .patch(updatePost);

module.exports = postRouter;
