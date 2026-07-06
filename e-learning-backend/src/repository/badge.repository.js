import Badge from "../models/Badges.js";

export const createBadge = (data) => Badge.create(data);
export const findBadgesByStudent = (studentId) => Badge.find({ student: studentId }).populate("course");
