import Joi from "joi";

const contentBlockSchema = Joi.object({
  type: Joi.string()
    .valid("text", "list", "code", "note", "quiz", "image")
    .required(),
  data: Joi.alternatives().conditional("type", [
    {
      is: "text",
      then: Joi.string().min(5).required()
    },
    {
      is: "list",
      then: Joi.array().items(Joi.string().min(1)).required()
    },
    {
      is: "code",
      then: Joi.object({
        language: Joi.string().valid("c", "cpp", "java", "python", "javascript", "bash").required(),
        data: Joi.string().min(3).required()
      }).required()
    },
    {
      is: "note",
      then: Joi.string().min(3).required()
    },
    {
      is: "quiz",
      then: Joi.object({
        question: Joi.string().min(5).required(),
        options: Joi.array().items(Joi.string()).min(2).required(),
        answer: Joi.string().required()
      }).required()
    },
    {
      is: "image",
      then: Joi.object({
        url: Joi.string().uri().required(),
        caption: Joi.string().optional()
      }).required()
    }
  ])
});

export const createLessonSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.array().items(contentBlockSchema).min(1).required(),
  points: Joi.number().min(1).required(),
  course: Joi.string().optional() // courseId
});

export const updateLessonSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  content: Joi.array().items(contentBlockSchema).min(1).optional(),
  points: Joi.number().min(1).optional()
});
