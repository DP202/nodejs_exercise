const Joi = require("joi");

const createAccountSchema = Joi.object({
  username: Joi.string().optional().messages({
    "string.base": "Tên tài khoản là dạng chuỗi",
    "string.empty": "Tên tài khoản bắt buộc nhập",
    "any.required": "Tên tài khoản bắt buộc nhập",
  }),
  email: Joi.string().optional().messages({
    "string.base": "Email phải là dạng chuỗi",
    "string.empty": "Email bắt buộc phải nhập",
    "string.email": "Email không hợp lệ",
    "any.required": "Email bắt buộc phải nhập",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.base": "Mật khẩu phải là dạng chuỗi",
    "string.empty": "Mật khẩu bắt buộc nhập",
    "string.min": "Mật khẩu phải có ít nhất 6 kí tự",
    "any.required": "Mật khẩu bắt buộc nhập",
  }),
});

const updateAccountSchema = Joi.object({
  username: Joi.string().optional().messages({
    "string.base": "Tên tài khoản phải là dạng chuỗi",
    "string.empty": "Tên tài khoản không được để trống",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email phải là dạng chuỗi",
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().optional().messages({
    "string.base": "Mật khẩu phải là dạng chuỗi",
    "string.empty": "Mật khẩu không được để trống",
  }),
});
module.exports = {
  createAccountValid: (body) => createAccountSchema.validate(body),
  updateAccountValid: (body) => updateAccountSchema.validate(body),
};
