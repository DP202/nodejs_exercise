const Joi = require("joi");

const createPostSchema = Joi.object({
  account_id: Joi.string().required().messages({
    "string.base": "account_id phải là dạng chuỗi",
    "string.empty": "account_id không được để trống",
    "any.required": "account_id bắt buộc nhập",
  }),
  title: Joi.string().required().messages({
    "string.base": "Tiêu đề bài viết là dạng chuỗi",
    "string.empty": "Tiêu đề bài viết bắt buộc phải nhập",
    "any.required": "Tiêu đề bài viết bắt buộc nhập",
  }),
  content: Joi.string().required().messages({
    "string.base": "Nội dung bài viết là dạng chuỗi",
    "string.empty": "Nội dung bài viết không được bỏ trống",
    "any.required": "Nội dung bài viết không được bỏ trống",
  }),
  tags: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Thẻ là một chuỗi",
      })
    )
    .messages({
      "array.base": "Tags phải là một mảng các chuỗi",
    }),
});

module.exports = {
  createPostValid: (body) => createPostSchema.validate(body),
};
