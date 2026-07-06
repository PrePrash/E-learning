import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().required(),
  level: Joi.string().valid("beginner", "intermediate", "advanced").required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().uri().optional(),
  badge: Joi.string().optional(),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  category: Joi.string().optional(),
  level: Joi.string().valid("beginner", "intermediate", "advanced").optional(),
  price: Joi.number().min(0).optional(),
  image: Joi.string().uri().optional(),
  isPublished: Joi.boolean().optional()
});