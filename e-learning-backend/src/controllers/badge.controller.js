import { awardBadge, getStudentBadges } from "../services/badge.service.js";
import { successResponse } from "../utils/response.js";

export const giveBadge = async (req, res) => {
  try {
    const { courseId, badgeName } = req.body;
    const badge = await awardBadge(req.user.id, courseId, badgeName);
     successResponse(res, {badge}, "badge awarded successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listBadges = async (req, res) => {
  try {
    const badges = await getStudentBadges(req.user.id);
        successResponse(res, {badges}, "badges fetched successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
