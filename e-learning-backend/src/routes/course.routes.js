import express from "express";
import { createCourse, getAllCourses, getSingleCourse, updateCourseById, deleteCourseById, enrollInCourse, getEnrolledCourses, getCoursesInstructor } from "../controllers/course.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";
import { validate } from "../middleware/validate.js";
import { createCourseSchema, updateCourseSchema } from "../validation/courseValidation.js";

const router = express.Router();

router.post("/", authenticate, authorize(["instructor", "admin"]), validate(createCourseSchema), createCourse);
router.get("/", getAllCourses);
router.get("/instructor", authenticate, getCoursesInstructor);

router.get("/enrolled", authenticate, getEnrolledCourses);
router.get("/:id", getSingleCourse);

router.put("/:id", authenticate, authorize(["instructor", "admin"]), validate(updateCourseSchema),updateCourseById);
router.delete("/:id", authenticate, authorize(["instructor", "admin"]), deleteCourseById);
router.post("/:id/enroll", authenticate, enrollInCourse);

export default router;