const { PER_PAGE } = require("../constant/common");
const bookModel = require("../models/book.model");

module.exports = {
  createBook: async (req, res) => {
    const body = req.body;
    try {
      const newAccount = await bookModel.create(body);

      return res.status(201).json({
        message: "Tạo sách thành công",
        data: newAccount,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi tạo sách",
        error: error.message,
      });
    }
  },

  getBookDetailById: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await bookModel.findById(bookId);

      if (!book) {
        return res.status(404).json({
          message: "Không tìm thấy sách",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết thông tin sách thành công",
        data: book,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy thông tin sách",
        error: error.message,
      });
    }
  },

  updateBook: async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      const updateBook = await bookModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updateBook) {
        return res.status(404).json({
          message: "Không tìm thấy sách",
        });
      }

      return res.status(200).json({
        message: "Cập nhật thông tin sách thành công",
        data: updateBook,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi cập nhật thông tin sách",
        error: error.message,
      });
    }
  },

  deleteBook: async (req, res) => {
    const bookId = req.params.id;
    try {
      const deleteBook = await bookModel.findByIdAndDelete(bookId);

      if (!deleteBook) {
        return res.status(404).json({
          message: "Không tìm thấy sách",
        });
      }

      return res.status(200).json({
        message: "Xóa sách thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi xóa sách",
        error: error.message,
      });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const {
        page = 1,
        author,
        title,
        min_price,
        max_price,
        category,
        sort,
      } = req.query;
      const bodyQuery = {};

      if (title) {
        bodyQuery.title = {
          $regex: `.*${title}.*`,
          $options: "i",
        };
      }

      if (author) {
        bodyQuery.author = {
          $regex: `.*${author}.*`,
          $options: "i",
        };
      }

      if (min_price || max_price) {
        bodyQuery.price = {};
        if (min_price) {
          bodyQuery.price.$gte = min_price;
        }

        if (max_price) {
          bodyQuery.price.$lte = max_price;
        }
      }

      if (category) {
        bodyQuery.category = category;
      }

      const sortOption = {};
      if (sort) {
        sortOption.price = sort.toLowerCase() === "asc" ? 1 : -1;
      }

      const books = await bookModel
        .find(bodyQuery)
        .sort(sortOption)
        .skip(PER_PAGE * (page - 1))
        .limit(PER_PAGE)
        .exec();

      const totalBook = await bookModel.countDocuments(bodyQuery);

      return res.status(200).json({
        message: "Lấy sách thành công",
        data: books,
        total_page: Math.ceil(totalBook / PER_PAGE),
        current_page: Number(page),
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lỗi khi lấy sách",
        error: error.message,
      });
    }
  },
};
