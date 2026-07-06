import { pubsub } from "../graphql/pubsub.js";
import Course from "../models/Course.js";
import { addCourse, getCourses, getCourseById, editCourse, removeCourse, getStudentCourses, getCoursesByInstructor, enrollStudent } from "../services/course.service.js";
import { successResponse } from "../utils/response.js";

export const createCourse = async (req, res) => {
  try {
    const course = await addCourse({ ...req.body, instructor: req.user.id});
 pubsub.publish("COURSE_CREATED", { courseCreated: course });
    successResponse(res, course, "Course created successfully", 201);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getCourses();
    successResponse(res, courses, "Courses fetched successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    successResponse(res, course, "Course fetched successfully");
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateCourseById = async (req, res) => {
  try {
    const updated = await editCourse(req.params.id, req.body);
    successResponse(res, updated, "Course updated successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCourseById = async (req, res) => {
  try {
    await removeCourse(req.params.id);
    successResponse(res, null, "Course deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const enrollInCourse = async (req, res) => {
    try {
    // Retrieve the course by ID
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Enroll student
    await enrollStudent(req.params.id, req.user.id);
    
    // Publish notification to the instructor
  pubsub.publish(`STUDENT_ENROLLED_${course.instructor}`, {
  newStudentEnrolled: {
    message: `👩‍🎓 Student ${req.user.name} enrolled in your course ${course.title}`,
    timestamp: new Date().toISOString(),
  },
});


    successResponse(res, null, "Enrolled in course successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// export const enrollInCourse = async (req, res) => {
//   try {
//     // Retrieve the course by ID
//     const course = await Course.findById(req.params.id);
//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     // Enroll student
//     await enrollStrudent(req.params.id, req.user.id);
    
//     // Publish notification to the instructor
//     pubsub.publish(`STUDENT_ENROLLED_${course.instructor}`, {
//       studentEnrolled: {
//         message: `👩‍🎓 Student ${req.user.name} enrolled in your course ${course.title}`,
//         timestamp: new Date().toISOString(),
//       },
//     });

//     successResponse(res, null, "Enrolled in course successfully");
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }

export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id; 
    const courses = await getStudentCourses(studentId);
    successResponse(res, courses, "Enrolled courses fetched successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCoursesInstructor = async (req, res) => {
  try {
    const courses = await getCoursesByInstructor(req.user.id);
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};
