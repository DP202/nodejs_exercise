const Joi = require("joi");

const createOrderScheme = Joi.object({
  account_id: Joi.string().length(24).required().messages({
    "string.base": "ID tài khoản phải là dạng chuỗi",
    "string.empty": "ID tài khoản bắt buộc phải nhập",
    "any.required": "ID tài khoản là bắt buộc",
    "string.length": "Id tài khoản phải có 24 ký tự",
  }),
  books: Joi.array()
    .items(
      Joi.object({
        book_id: Joi.string().length(24).required().messages({
          "string.base": "ID sách phải là dạng chuỗi",
          "string.empty": "ID sách bắt buộc phải nhập",
          "any.required": "ID sách là bắt buộc",
          "string.length": "ID sách phải có 24 ký tự",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Số lượng là một số",
          "any.required": "Số lượng là bắt buộc",
          "number.min": "Số lương phải lớn hơn hoặc bắng 1",
          "number.integer": "Số lương phải là số nguyên",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Danh sách sách phải là mảng",
      "array.min": "Danh sách sách không thể trống",
      "any.required": "Danh sách sách là bắt buộc",
    }),

  totalPrice: Joi.number().greater(0).optional().messages({
    "number.base": "Giá trị tổng phải là một số",
    "any.required": "Tổng giá trị là bắt buộc",
    "number.greater": "Tổng giá trị phải lớn hơn 0",
  }),

  status: Joi.string()
    .valid("pending", "completed", "cancelled")
    .default("pending")
    .optional()
    .messages({
      "string.base": "Trạng thái phải là chuỗi",
      "any.required": "Trạng thái là bắt buộc",
      "any.only":
        "Trạng thái phải là một trong các giá trị: pending, completed, cancelled",
    }),
});

module.exports = {
  createOrderValid: (body) => createOrderScheme.validate(body),
};
