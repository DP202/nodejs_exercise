const postModel = require("../models/post.model");

module.exports = {
  createPost: async (req, res) => {
    const body = req.body;
    try {
      const newPost = await postModel.create(body);
      return res.status(201).json({
        message: "Tạo bài viết thành công",
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Tạo bài viết thất bại",
        error: error.message,
      });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const post = await postModel.find();
      return res.status(200).json({
        message: "Lấy thông tin bài viết thành công",
        data: post,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lấy danh sách bài viết thất bại",
        error: error.message,
      });
    }
  },

  getPostDetail: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await postModel.findById(postId).populate("account_id");
      if (!post) {
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      }
      return res.status(200).json({
        message: "Lấy thông tin bài viết thành công",
        data: post,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lấy bài viết theo ID thất bại",
        error: error.message,
      });
    }
  },

  updatePost: async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      const updatePost = await postModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatePost) {
        return res.status(400).json({
          message: "Không tìm thấy bài viết",
        });
      }

      return res.status(200).json({
        message: "Cập nhật bài viết thành công",
        data: updatePost,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cập nhật thông tin bài viết thất bại",
        error: error.message,
      });
    }
  },

  deletePost: async (req, res) => {
    const id = req.params.id;

    try {
      const deletePost = await postModel.findByIdAndDelete(id);
      if (!deletePost) {
        return res.status(404).json({
          message: "Không tìm thấy bài viết",
        });
      }

      return res.status(200).json({
        message: "Xóa bài viết thành công !",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Xóa bài viết thất bại",
        error: error.message,
      });
    }
  },
};
