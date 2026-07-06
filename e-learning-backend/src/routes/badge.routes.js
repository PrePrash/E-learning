import express from "express";
import { giveBadge, listBadges } from "../controllers/badge.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();

// student can only view own badges
router.get("/", authenticate, authorize(["student"]), listBadges);

// system/instructor awards badges
router.post("/", authenticate, authorize(["instructor", "admin"]), giveBadge);

export default router;
