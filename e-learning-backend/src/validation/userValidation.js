// validation/userValidation.js
import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must not exceed 50 characters",
    }),

  email: Joi.string()
    .email()
    .messages({
      "string.email": "Please provide a valid email address",
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]+$"))
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
    }),

  role: Joi.string().valid("student", "instructor").messages({
    "any.only": "Role must be either student, instructor"
  }),
});
