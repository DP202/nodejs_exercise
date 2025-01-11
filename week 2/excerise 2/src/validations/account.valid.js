const Joi = require("joi");

const createAccountSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Tên đăng nhập phải là dạng chuỗi",
    "string.empty": "Tên đăng nhập bắt buộc phải nhập",
    "any.required": "Tên đăng nhập bắt buộc phải nhập",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Mật khẩu phải là dạng chuỗi",
    "string.empty": "Mật khẩu bắt buộc nhập",
    "string.min": "Mật khẩu phải có ít nhất 6 kí tự",
    "any.required": "Mật khẩu bắt buộc nhập",
  }),
  email: Joi.string().required().messages({
    "string.base": "Email phải là dạng chuỗi",
    "string.empty": "Email bắt buộc phải nhập",
    "string.email": "Email không hợp lệ",
    "any.required": "Email bắt buộc phải nhập",
  }),
  role: Joi.string().valid("user", "admin").required().messages({
    "string.base": "Role là dạng chuỗi",
    "any.only": "Role phải là 1 trong các giá trị : user , admin",
    "any.required": "Role bắt buộc nhập",
  }),
});

const updateAccountSchema = Joi.object({
  username: Joi.string().optional().messages({
    "string.base": "Tên đăng nhập phải là dạng chuỗi",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.base": "Mật khẩu phải là dạng chuỗi",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email phải là dạng chuỗi",
    "string.email": "Email không hợp lệ",
  }),
  role: Joi.string().valid("user", "admin").optional().messages({
    "string.base": "Role là dạng chuỗi",
    "any.only": "Role phải là 1 trong các giá trị: user, admin",
  }),
});

module.exports = {
  createAccountValid: (body) => createAccountSchema.validate(body),
  updateAccountValid: (body) => updateAccountSchema.validate(body),
};
