const Joi = require("joi");

const createCommentSchema = Joi.object({
  post_id: Joi.string().required().messages({
    "string.base": "post_id phải là dạng chuỗi",
    "string.empty": "post_id không được để trống",
    "any.required": "post_id không được để trống",
  }),
  account_id: Joi.string().required().messages({
    "string.base": "account_id phải là dạng chuỗi",
    "string.empty": "account_id không được để trống",
    "any.required": "account_id không được để trống",
  }),
  content: Joi.string().required().messages({
    "string.base": "Nội dung bình luận là dạng chuỗi",
    "string.empty": "Nội dung bình luận không được bỏ trống",
    "any.required": "Nội dung bình luận không được bỏ trống",
  }),
});

module.exports = {
  createCommentValid: (body) => createCommentSchema.validate(body),
};
