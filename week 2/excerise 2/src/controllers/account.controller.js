const { PER_PAGE } = require("../constant/common");
const {
  createAccountValid,
  updateAccountValid,
} = require("../validations/account.valid");
const accountModel = require("../models/account.model");

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

  getAccountDetail: async (req, res) => {
    try {
      const accountId = req.params.id;
      const account = await accountModel
        .findById(accountId)
        .select("-password");
      if (!account) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết thông tin tài khoản thành công",
        data: account,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy thông tin tài khoản",
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
        message: "Lỗi khi cập nhật thông tin tài khoản",
        error: error.message,
      });
    }
  },

  deleteAccount: async (req, res) => {
    const accountId = req.params.id;
    try {
      const deletedAccount = await accountModel.findByIdAndDelete(accountId);

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

  getAllAccount: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const bodyQuery = {};
      const accounts = await accountModel
        .find(bodyQuery)
        .skip(PER_PAGE * (page - 1))
        .limit(PER_PAGE)
        .select("-password")
        .exec();

      const totalAccounts = await accountModel.countDocuments(bodyQuery);
      console.log(totalAccounts);

      return res.status(200).json({
        message: "Lấy danh sách tài khoản thành công",
        data: accounts,
        total_page: Math.ceil(totalAccounts / PER_PAGE),
        current_page: Number(page),
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy tài khoản",
        error: error.message,
      });
    }
  },
};
