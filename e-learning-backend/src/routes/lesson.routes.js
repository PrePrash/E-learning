import express from "express";
import { createLesson, getSingleLesson, updateLessonById, deleteLessonById, checkAnswer, checkQuiz } from "../controllers/lesson.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";
import { validate } from "../middleware/validate.js";
import { createLessonSchema, updateLessonSchema } from "../validation/lessonValidation.js";
import Lesson from "../models/Lesson.js";


const router = express.Router();


router.post("/:id/check",authenticate, checkQuiz);
router.post("/:courseId", authenticate, authorize(["instructor", "admin"]), validate(createLessonSchema),createLesson);
router.get("/:id", getSingleLesson);
router.put("/:id", authenticate, authorize(["instructor", "admin"]),validate(updateLessonSchema), updateLessonById);
router.delete("/:id", authenticate, authorize(["instructor", "admin"]), deleteLessonById);

export default router;
