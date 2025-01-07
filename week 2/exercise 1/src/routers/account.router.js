const express = require("express");

const accountRouter = express.Router();

const {
  createAccount,
  getAllAcounts,
  getAccountById,
  deleteAccount,
  updateAccount,
} = require("../controllers/accout.controller");

accountRouter.route("/").get(getAllAcounts).post(createAccount);

accountRouter
  .route("/:id")
  .get(getAccountById)
  .delete(deleteAccount)
  .patch(updateAccount);

module.exports = accountRouter;
