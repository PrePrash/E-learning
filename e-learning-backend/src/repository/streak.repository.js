import Streak from "../models/Streak.js";

export const findStreakByStudent = (studentId) => Streak.findOne({ student: studentId });
export const createStreak = (data) => Streak.create(data);
export const updateStreak = (id, data) => Streak.findByIdAndUpdate(id, data, { new: true });
