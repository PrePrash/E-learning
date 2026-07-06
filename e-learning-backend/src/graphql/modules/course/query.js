import Course from "../../../models/Course.js";


export const courseQueryResolver = {
  courses: async () => {
    const courses = await Course.find().populate("instructor").populate("lessons");
    return courses.map(course => ({
      ...course.toObject(),
      id: course._id.toString(),
      category: course.category || "Uncategorized", // optional default
    }));
  },

  course: async (_, { id }) => {
    const course = await Course.findById(id).populate("instructor");
    if (!course) return null;
    return {
      ...course.toObject(),
      id: course._id.toString(),
      category: course.category || "Uncategorized",
    };
  },
};



