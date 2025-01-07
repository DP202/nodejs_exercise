const express = require("express");

const accountRouter = express.Router();

const {
  createAccount,
  getAccountDetail,
  updateAccount,
  deleteAccount,
  getAllAccount,
} = require("../controllers/account.controller");

accountRouter.route("/").post(createAccount).get(getAllAccount);
accountRouter
  .route("/:id")
  .get(getAccountDetail)
  .patch(updateAccount)
  .delete(deleteAccount);

module.exports = accountRouter;
