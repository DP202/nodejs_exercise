const accountRouter = require("./account.router");
const bookRouter = require("./book.router");

module.exports = (app) => {
  app.use("/accounts", accountRouter);
  app.use("/books", bookRouter);
};
