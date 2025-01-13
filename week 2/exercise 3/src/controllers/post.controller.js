const postModel = require("../models/post.model");
const accountModel = require("../models/account.model");
const { createPostValid } = require("../validations/post.valid");
const { PER_PAGE } = require("../constant/common");
const mongoose = require("mongoose");
const commentModel = require("../models/comment.model");

module.exports = {
  createPost: async (req, res) => {
    try {
      const body = req.body;
      const { error, value } = createPostValid(body);
      //   console.log("Value :", value);

      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }

      // kiểm tra objectId account_id
      if (!mongoose.Types.ObjectId.isValid(value.account_id)) {
        return res.status(400).json({
          message: "account_id không hợp lệ",
        });
      }

      const accountExists = await accountModel.findById(value.account_id);
      if (!accountExists) {
        return res.status(404).json({
          message: "Tài khoản không tồn tại",
        });
      }

      const newPost = await postModel.create(value);

      return res.status(201).json({
        message: "Tạo bài viết thành công",
        data: newPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi tạo bài viết",
        error: error.message,
      });
    }
  },

  getAllPost: async (req, res) => {
    try {
      const { page = 1, title, tags } = req.query;
      const bodyQuery = {};

      if (title) {
        bodyQuery.title = {
          $regex: title,
          $options: "i",
        };
      }

      if (tags) {
        bodyQuery.tags = {
          $in: tags.split(","), // chuyển về mảng , $in kiểm tra tồn tại -> $in chỉ kiểm tra với mảng
        };
      }

      const posts = await postModel
        .find(bodyQuery)
        .populate("account_id", "username email")
        .skip(PER_PAGE * (page - 1))
        .limit(PER_PAGE)
        .exec();

      const totalPost = await postModel.countDocuments(bodyQuery);
      return res.status(200).json({
        message: "Lấy danh sách bài viết thành công",
        data: posts,
        total_page: Math.ceil(totalPost / PER_PAGE),
        current_page: Number(page),
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy danh sách bài viết",
        error: error.message,
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("ID :", id);
      const post = await postModel.findById(id).exec();
      if (!post) {
        return res.status(404).json({
          message: "Bài viết không tồn tại",
        });
      }

      const comments = await commentModel.find({ post_id: id }).exec();

      return res.status(200).json({
        message: "Lấy chi tiết bài viết thành công",
        data: {
          post,
          comments,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy chi tiết bài viết",
        error: error.message,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, content, tags } = req.body;
      const updateData = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (tags) updateData.tags = tags;

      const updatedPost = await postModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedPost) {
        return res.status(404).json({
          message: "Không tìm thấy bài viết.",
        });
      }

      return res.status(200).json({
        message: "Cập nhật bài viết thành công",
        data: updatedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi cập nhật bài viết",
        error: error.message,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedPost = await postModel.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      }
      return res.status(200).json({
        data: deletedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi xóa bài viết",
        error: error.message,
      });
    }
  },
};
