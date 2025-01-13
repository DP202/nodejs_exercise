const express = require("express");
const commentRouter = express.Router();

const {
  createComment,
  getAllCommentsByPost,
  deleteComment,
} = require("../controllers/comment.controller");

commentRouter.route("/").post(createComment);
commentRouter.route("/:id").delete(deleteComment);
commentRouter.route("/:post_id").get(getAllCommentsByPost);

module.exports = commentRouter;
