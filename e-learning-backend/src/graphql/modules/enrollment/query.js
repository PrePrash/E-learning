import Course from "../../../models/Course.js";

export const enrollmentQuery = {
  getEnrolledCourses: async (_, __, { user }) => {
    if (!user) throw new Error("Unauthorized");

    // Find courses where the user is enrolled
    const courses = await Course.find({ enrolledStudents: user.id }).populate("instructor");

    return courses;
  },
};
