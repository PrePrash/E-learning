import { createCourse, findAllCourses, findCourseById, updateCourse, deleteCourse, enrollInCourse, findCoursesByStudent, findByInstructor } from "../repository/course.repository.js";

export const addCourse = async (data) => await createCourse(data);
export const getCourses = async () => await findAllCourses();
export const getCourseById = async (id) => await findCourseById(id);
export const editCourse = async (id, data) => await updateCourse(id, data);
export const removeCourse = async (id) => await deleteCourse(id);
export const enrollStudent = async (courseId, studentId) => await enrollInCourse(courseId, studentId);
export const getStudentCourses = async (studentId) =>  await findCoursesByStudent(studentId);
export const getCoursesByInstructor =  async (instructorId) => {
    const courses = await findByInstructor(instructorId);
    if (!courses.length) throw new Error("No courses found for this instructor");
    return courses;
  }