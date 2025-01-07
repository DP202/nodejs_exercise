const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  account_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
