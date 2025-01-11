const express = require("express");
const orderRouter = express.Router();

const {
  createOrder,
  updateStatusOrder,
  getOrderById,
} = require("../controllers/order.controller");

orderRouter.route("/").post(createOrder);
orderRouter.route("/:id").patch(updateStatusOrder).get(getOrderById);

orderRouter.route("/account/:accountId");

module.exports = orderRouter;
