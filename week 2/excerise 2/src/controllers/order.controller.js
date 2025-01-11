const { PER_PAGE } = require("../constant/common");
const bookModel = require("../models/book.model");
const orderModel = require("../models/order.model");
const { createOrderValid } = require("../validations/order.valid");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = createOrderValid(body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details[0].message,
        });
      }

      let totalPrice = 0;

      // Duyệt mảng books để lấy id -> tính tổng tiền
      for (let item of value.books) {
        const bookId = await bookModel.findById(item.book_id);
        if (!bookId) {
          return res.status(404).json({
            message: "Không tìm thấy",
          });
        }
        totalPrice += bookId.price * item.quantity;
      }

      const newOrder = await orderModel.create({
        account_id: value.account_id,
        books: value.books,
        totalPrice: totalPrice,
        status: "pending",
      });

      const populateOrder = await orderModel
        .findById(newOrder._id)
        .populate("account_id")
        .populate("books.book_id")
        .exec();

      return res.status(201).json({
        message: "Tạo đơn hàng thành công",
        data: populateOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi tạo đơn hàng",
        error: error.message,
      });
    }
  },
  updateStatusOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.body.status;

      const validStatus = ["pending", "completed", "cancelled"];

      if (!validStatus.includes(status)) {
        return res.status(500).json({
          message: "Trạng thái không hợp lệ",
        });
      }

      const updateStatus = await orderModel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );

      if (!updateStatus) {
        return res.status(404).json({
          message: "Không tìm thấy đơn hàng",
        });
      }

      return res.status(200).json({
        message: "Cập nhật trạng thái của đơn hàng thành công",
        data: updateStatus,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi cập nhật đơn hàng",
        error: error.message,
      });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await orderModel
        .findById(id)
        .populate("account_id", "username password") // tham số thứ 2 của populate -> chỉ định field muốn lấy
        .populate("books.book_id", "title author price")
        .exec();

      if (!order) {
        return res.status(404).json({
          message: "Không tìm thấy đơn hàng",
        });
      }

      return res.status(200).json({
        message: "Lấy thông tin đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy đơn hàng",
        error: error.message,
      });
    }
  },
};
