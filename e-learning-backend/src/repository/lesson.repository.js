import Lesson from "../models/Lesson.js";

export const createLesson = (lessonData) => Lesson.create(lessonData);
export const findLessonById = (id) => Lesson.findById(id).populate("course");
export const updateLesson = (id, data) => Lesson.findByIdAndUpdate(id, data, { new: true });
export const deleteLesson = (id) => Lesson.findByIdAndDelete(id);
export const findLessonsByCourse = (courseId) => Lesson.find({ course: courseId });