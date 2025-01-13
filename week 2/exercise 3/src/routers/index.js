const accountRouter = require("./account.router");
const commentRouter = require("./comment.router");
const postRouter = require("./post.router");

module.exports = (app) => {
  app.use("/accounts", accountRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
};
