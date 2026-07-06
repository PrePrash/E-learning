import { updateStudentStreak, getStudentStreak } from "../services/streak.service.js";
import { successResponse } from "../utils/response.js";

export const updateStreak = async (req, res) => {
  try {
    const streak = await updateStudentStreak(req.user.id);
    successResponse(res, streak, "Streak updated successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStreak = async (req, res) => {
  try {
    const streak = await getStudentStreak(req.user.id);
    successResponse(res, streak || { currentStreak: 0 }, "Streak fetched successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
