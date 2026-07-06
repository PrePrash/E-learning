import express from "express";
import { updateStreak, getStreak } from "../controllers/streak.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();

router.get("/", authenticate, authorize(["student"]), getStreak);
router.post("/update", authenticate, authorize(["student"]), updateStreak);

export default router;
