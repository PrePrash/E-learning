import Course from "../models/Course.js";

export const createCourse = (courseData) => Course.create(courseData);
export const findCourseById = (id) => Course.findById(id).populate("lessons",  "title _id content").populate("instructor", "name email");
export const findAllCourses = () => Course.find().populate("lessons");
export const updateCourse = (id, data) => Course.findByIdAndUpdate(id, data, { new: true });
export const deleteCourse = (id) => Course.findByIdAndDelete(id);
export const addLessonToCourse = (courseId, lessonId) =>
  Course.findByIdAndUpdate(courseId, { $push: { lessons: lessonId } }, { new: true });
export const enrollInCourse = async (courseId, studentId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");
    if (course.enrolledStudents.includes(studentId)) {
    throw new Error("You are already enrolled in this course");
  }
  course.enrolledStudents.push(studentId);
  await course.save();

  return course;
};
export const findCoursesByStudent = (studentId) => 
    Course.find({ enrolledStudents: studentId }).populate("lessons").populate("instructor");

export const findByInstructor =  async (instructorId) =>  await Course.find({ instructor: instructorId }).populate("instructor", "name email");
