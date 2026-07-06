import { createLesson, findLessonById, updateLesson, deleteLesson } from "../repository/lesson.repository.js";
import { updateCourse } from "../repository/course.repository.js";
import { updateProgress } from "./progress.service.js";

export const addLesson = async (courseId, data, userId) => {
  const lesson = await createLesson({ ...data, course: courseId, instructor: userId });
  await updateCourse(courseId, { $push: { lessons: lesson._id } });
  return lesson;
};

export const getLessonById = async (id) => await findLessonById(id);
export const editLesson = async (id, data) => await updateLesson(id, data);
export const removeLesson = async (id) => await deleteLesson(id);
export const checkAnswerId = async (lessonId, question, selectedAnswer) => {
   const lesson = await findLessonById(lessonId);
  if (!lesson) return { lesson: null };

  const quizItem = lesson.content.find(
    (c) => c.type === "quiz" && c.data.question === question
  );
  if (!quizItem) return { lesson, quiz: null };

  const isCorrect = quizItem.data.answer === selectedAnswer;
  return { lesson, quiz: quizItem, isCorrect };
};
export const checkQuizId = async ({ lessonId, userId, question, selectedAnswer }) => {
  // 1. Get lesson
  const lesson = await findLessonById(lessonId);
  if (!lesson) return { error: "Lesson not found" };

  // 2. Find quiz item
  const quizItem = lesson.content.find(
    (c) => c.type === "quiz" && c.data.question === question
  );
  if (!quizItem) return { error: "Quiz not found" };

  const isCorrect = quizItem.data.answer === selectedAnswer;

  // 3. If correct → update Progress (this will also award points only once)
  if (isCorrect) {
    await updateProgress(userId, lessonId, true);
  }

  return { correct: isCorrect };
};
