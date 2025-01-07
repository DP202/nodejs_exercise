const accountRouter = require("./account.router");
const postRouter = require("./post.router");

module.exports = (app) => {
  app.use("/api/accounts", accountRouter);
  app.use("/api/posts", postRouter);
};
