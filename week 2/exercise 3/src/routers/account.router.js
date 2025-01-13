const express = require("express");

const accountRouter = express.Router();
const {
  createAccount,
  getAllAccounts,
  getAccountDetailById,
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller");

accountRouter.route("/").post(createAccount).get(getAllAccounts);
accountRouter
  .route("/:id")
  .get(getAccountDetailById)
  .patch(updateAccount)
  .delete(deleteAccount);

module.exports = accountRouter;
