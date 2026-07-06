import { Router } from "express";

const router = Router();
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";
import { validate } from "../middleware/validate.js";
import { updateUserSchema } from "../validation/userValidation.js"; 
import { deleteUserProfile, getAllUsers, getme, getUserById, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
// User routes
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, validate(updateUserSchema), updateUserProfile);
router.delete("/profile", authenticate, deleteUserProfile);
router.get("/", authenticate, authorize(["admin"]), getAllUsers);
router.get("/me", authenticate, getme);
router.get("/:id", authenticate, authorize(["admin"]), getUserById);
export default router;
