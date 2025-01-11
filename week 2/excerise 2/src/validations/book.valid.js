const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Tiêu đề phải là dạng chuỗi",
    "string.empty": "Tiêu đề bắt buộc phải nhập",
    "any.required": "Tiêu đề bắt buộc phải nhập",
  }),
  author: Joi.string().required().messages({
    "string.base": "Tác giả phải là dạng chuỗi",
    "string.empty": "Tác giả bắt buộc phải nhập",
    "any.required": "Tác giả bắt buộc phải nhập",
  }),
  price: Joi.number().greater(0).required().messages({
    "number.base": "Giá phải là dạng số",
    "any.required": "Giá bắt buộc phải nhập",
    "number.greater": "Giá phải lớn hơn 0",
  }),
  category: Joi.string().required().messages({
    "string.base": "Danh mục phải là dạng chuỗi",
    "string.empty": "Danh mục bắt buộc phải nhập",
    "any.required": "Danh mục bắt buộc phải nhập",
  }),
  stock: Joi.number().required().messages({
    "number.base": "Số lượng phải là dạng số",
    "any.required": "Số lượng bắt buộc phải nhập",
  }),
});

const updateBookSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Tiêu đề phải là dạng chuỗi",
    "string.empty": "Tiêu đề không được để trống",
  }),
  author: Joi.string().optional().messages({
    "string.base": "Tác giả phải là dạng chuỗi",
    "string.empty": "Tác giả không được để trống",
  }),
  price: Joi.number().greater(0).optional().messages({
    "number.base": "Giá phải là dạng số",
    "number.greater": "Giá phải lớn hơn 0",
  }),
  category: Joi.string().optional().messages({
    "string.base": "Danh mục phải là dạng chuỗi",
    "string.empty": "Danh mục không được để trống",
  }),
  stock: Joi.number().optional().messages({
    "number.base": "Số lượng phải là dạng số",
  }),
});
module.exports = {
  createBookValid: (body) => createBookSchema.validate(body),
  updateBookValid: (body) => updateBookSchema.validate(body),
};
