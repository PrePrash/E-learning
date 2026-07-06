import { createBadge, findBadgesByStudent } from "../repository/badge.repository.js";

export const awardBadge = async (studentId, courseId, badgeName) => {
  return await createBadge({ student: studentId, course: courseId, name: badgeName });
};

export const getStudentBadges = async (studentId) => {
  return await findBadgesByStudent(studentId);
};
