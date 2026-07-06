import { editCourse } from "../services/course.service.js";
import { addLesson, getLessonById, editLesson, removeLesson, checkAnswerId, checkQuizId } from "../services/lesson.service.js";
import { successResponse } from "../utils/response.js";

export const createLesson = async (req, res) => {
  try {
    const lesson = await addLesson(req.params.courseId, req.body, req.user.id);
    successResponse(res, lesson, "Lesson created successfully", 201);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSingleLesson = async (req, res) => {
  try {
    const lesson = await getLessonById(req.params.id);
    successResponse(res, lesson, "Lesson fetched successfully");
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateLessonById = async (req, res) => {
  try {
    const updated = await editLesson(req.params.id, req.body);
    successResponse(res, updated, "Lesson updated successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLessonById = async (req, res) => {
  try {
    // Find the lesson first
    const lesson = await getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    // Remove lesson ID from the course's lessons array
    if (lesson.course) {
      await editCourse(lesson.course, {
        $pull: { lessons: lesson._id },
      });
    }

    // Delete the lesson
    await removeLesson(req.params.id);

    successResponse(res, null, "Lesson deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const checkQuiz = async (req, res) => {
  try {
    const { id } = req.params; // lessonId
    const userId = req.user.id; // from auth middleware
    const { question, selectedAnswer } = req.body;

    const result = await checkQuizId({
      lessonId: id,
      userId,
      question,
      selectedAnswer,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in checkQuiz:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const checkAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, selectedAnswer } = req.body;

    const result = await checkAnswerId(id, question, selectedAnswer);

    if (!result.lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    if (!result.quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    return res.json({ correct: result.isCorrect });
  } catch (err) {
    console.error("Error in checkAnswer controller:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

