import * as progressService from "../services/progress.service.js";

export async function updateProgress(req, res) {
  try {
    const { studentId, lessonId, completed } = req.body;
    const progress = await progressService.updateProgress(studentId, lessonId, completed);
    res.status(200).json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getCourseProgress(req, res) {
  try {
    const { studentId, courseId } = req.params;
    const progress = await progressService.getCourseProgress(studentId, courseId);
    res.status(200).json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
