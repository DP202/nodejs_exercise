const accountModel = require("../models/account.model");
const postModel = require("../models/post.model");
module.exports = {
  createAccount: async (req, res) => {
    const body = req.body;

    try {
      const newAccount = await accountModel.create(body);

      return res.status(201).json({
        message: "Tạo tài khoản thành công",
        data: newAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Tạo tài khoản thất bại",
        error: error.message,
      });
    }
  },

  getAllAcounts: async (req, res) => {
    try {
      const account = await accountModel.find();

      return res.status(200).json({
        message: "Lấy danh sách tài khoản thành công",
        data: account,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lấy danh sách tài khoản thất bại",
        error: error.message,
      });
    }
  },

  getAccountById: async (req, res) => {
    const accountId = req.params.id;
    const account = await accountModel.findById(accountId);

    if (!account) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }

    const posts = await postModel
      .find({
        account_id: account._id,
      })
      .populate("account_id");

    if (posts.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết cho tài khoản này",
      });
    }

    return res.status(200).json({
      message: "Lấy bài viết thành công",
      data: posts,
    });
  },

  updateAccount: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const updateAccount = await accountModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updateAccount) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản ",
        });
      }
      return res.status(200).json({
        message: "Cập nhật thông tin tài khoản thành công",
        data: updateAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cập nhật thông tin tài khoản thất bại",
        error: error.message,
      });
    }
  },

  deleteAccount: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedAccount = await accountModel.findByIdAndDelete(id);

      if (!deletedAccount) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }

      return res.status(200).json({
        message: "Xóa tài khoản thành công !",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Xóa tài khoản thất bại",
        error: error.message,
      });
    }
  },
};
