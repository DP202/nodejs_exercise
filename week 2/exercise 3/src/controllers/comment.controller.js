const { PER_PAGE } = require("../constant/common");
const mongoose = require("mongoose");

const { createCommentValid } = require("../validations/comment.valid");
const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");
const accountModel = require("../models/account.model");

module.exports = {
  createComment: async (req, res) => {
    try {
      const body = req.body;
      const { error, value } = createCommentValid(body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }

      if (!mongoose.Types.ObjectId.isValid(value.post_id)) {
        return res.status(400).json({
          message: "post_id không hợp lệ",
        });
      }

      const postExists = await postModel.findById(value.post_id);
      if (!postExists) {
        return res.status(404).json({
          message: "Bài viết không tồn tại",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(value.account_id)) {
        return res.status(400).json({
          message: "account_id không hợp lệ",
        });
      }

      const accountExists = await accountModel.findById(value.account_id);
      if (!accountExists) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }

      const newComment = await commentModel.create(value);

      return res.status(201).json({
        message: "Tạo bình luận thành công",
        data: newComment,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi tạo bình luận",
        error: error.message,
      });
    }
  },

  getAllCommentsByPost: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const postId = req.params.post_id;
      // console.log("Post Id : ", postId);

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({
          message: "post_id không hợp lệ",
        });
      }

      const comments = await commentModel
        .find({ post_id: postId })
        .populate("account_id", "username email")
        .populate("post_id", "title")
        .skip(PER_PAGE * (page - 1))
        .limit(PER_PAGE)
        .exec();

      const totalComment = await commentModel.countDocuments({
        post_id: postId,
      });

      return res.status(200).json({
        message: "Lấy danh sách bình luận thành công",
        data: comments,
        total_page: Math.ceil(totalComment / PER_PAGE),
        current_page: Number(page),
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy danh sách bình luận",
        error: error.message,
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const id = req.params.id;

      const deletedComment = await commentModel.findByIdAndDelete(id);
      if (!deletedComment) {
        return res.status(404).json({
          message: "Không tìm thấy bình luận ",
        });
      }
      return res.status(200).json({
        data: deletedComment,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi xóa bình luận",
        error: error.message,
      });
    }
  },
};
