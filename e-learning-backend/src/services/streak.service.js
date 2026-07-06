import { findStreakByStudent, createStreak, updateStreak } from "../repository/streak.repository.js";

export const updateStudentStreak = async (studentId) => {
  let streak = await findStreakByStudent(studentId);
  const today = new Date().setHours(0,0,0,0);

  if (!streak) {
    streak = await createStreak({ student: studentId, currentStreak: 1, lastActiveDate: today });
  } else {
    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate).setHours(0,0,0,0) : null;

    if (lastActive === today) {
      // already active today, do nothing
      return streak;
    } else if (lastActive && today - lastActive === 86400000) {
      // consecutive day → increment streak
      streak = await updateStreak(streak._id, { currentStreak: streak.currentStreak + 1, lastActiveDate: today });
    } else {
      // missed a day → reset streak
      streak = await updateStreak(streak._id, { currentStreak: 1, lastActiveDate: today });
    }
  }
  return streak;
};

export const getStudentStreak = async (studentId) => {
  return await findStreakByStudent(studentId);
};
