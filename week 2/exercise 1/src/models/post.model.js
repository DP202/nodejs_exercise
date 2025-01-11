const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("post", postSchema);
