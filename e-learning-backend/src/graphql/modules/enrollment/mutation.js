
import Course from "../../../models/Course.js";
import { pubsub } from "../../pubsub.js";


export const enrollmentMutation = {
  enrollInCourse: async (_, { courseId }, { user }) => {
    if (!user) throw new Error("Unauthorized");
    const course = await Course.findById(courseId).populate("instructor");

    if (!course) throw new Error("Course not found");
    if (course.enrolledStudents.includes(user.id)) {
      throw new Error("You are already enrolled in this course");
    }
    course.enrolledStudents.push(user.id);
    await course.save();
    pubsub.publish(`STUDENT_ENROLLED_${course.instructor.id}`, {
      studentEnrolled: {
        message: `👩‍🎓 Student ${user.id} enrolled in your course ${course.title}`,
        timestamp: new Date().toISOString(),
      },
    });

    return course;
  },
};
