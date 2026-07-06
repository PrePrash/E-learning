import express from "express";
import * as progressController from "../controllers/progress.controller.js";

const router = express.Router();

router.post("/", progressController.updateProgress);
router.get("/:studentId/:courseId", progressController.getCourseProgress);

export default router;
