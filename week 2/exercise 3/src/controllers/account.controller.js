const accountModel = require("../models/account.model");
const {
  createAccountValid,
  updateAccountValid,
} = require("../validations/account.valid");
const { PER_PAGE } = require("../constant/common");
const postModel = require("../models/post.model");
module.exports = {
  createAccount: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = createAccountValid(body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }

      const newAccount = await accountModel.create(value);

      return res.status(201).json({
        message: "Tạo tài khoản thành công",
        data: newAccount,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi tạo tài khoản",
        error: error.message,
      });
    }
  },

  getAllAccounts: async (req, res) => {
    try {
      const { page = 1, username } = req.query;
      const bodyQuery = {};
      if (username) {
        bodyQuery.username = {
          $regex: username,
          $options: "i",
        };
      }

      const accounts = await accountModel
        .find(bodyQuery)
        .skip(PER_PAGE * (page - 1))
        .limit(PER_PAGE)
        .select("-password")
        .exec();

      const totalAccounts = await accountModel.countDocuments(bodyQuery);

      return res.status(200).json({
        message: "Lấy danh sách tài khoản thành công",
        data: accounts,
        total_page: Math.ceil(totalAccounts / PER_PAGE),
        current_page: Number(page),
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy danh sách tài khoản",
        error: error.message,
      });
    }
  },

  getAccountDetailById: async (req, res) => {
    try {
      const id = req.params.id;
      const account = await accountModel.findById(id).select("-password");

      if (!account) {
        return res.message(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }
      const posts = await postModel
        .find({ account_id: id })
        .select("title content tags");

      return res.status(200).json({
        message: "Lấy chi tiết tài khoản thành công",
        data: {
          account,
          posts,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy chi tiết tài khoản",
        error: error.message,
      });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const { error, value } = updateAccountValid(body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }

      const updateAccount = await accountModel.findByIdAndUpdate(id, value, {
        new: true,
      });

      if (!updateAccount) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }

      return res.status(200).json({
        message: "Cập nhật thông tin tài khoản thành công",
        data: updateAccount,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi cập nhật tài khoản",
        error: error.message,
      });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const id = req.params.id;

      const deletedAccount = await accountModel.findByIdAndDelete(id);
      if (!deletedAccount) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }
      return res.status(200).json({
        data: deletedAccount,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi xóa tài khoản",
        error: error.message,
      });
    }
  },
};
