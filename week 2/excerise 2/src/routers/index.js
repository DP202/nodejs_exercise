const accountRouter = require("./account.router");
const bookRouter = require("./book.router");
const orderRouter = require("./order.router");

module.exports = (app) => {
  app.use("/accounts", accountRouter);
  app.use("/books", bookRouter);
  app.use("/orders", orderRouter);
};
