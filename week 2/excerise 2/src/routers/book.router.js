const express = require("express");

const bookRouter = express.Router();

const {
  createBook,
  getBookDetailById,
  deleteBook,
  updateBook,
  getAllBooks,
} = require("../controllers/book.controller");

bookRouter.route("/").post(createBook).get(getAllBooks);
bookRouter
  .route("/:id")
  .get(getBookDetailById)
  .delete(deleteBook)
  .patch(updateBook);

module.exports = bookRouter;
