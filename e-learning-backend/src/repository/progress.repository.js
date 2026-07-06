import Progress from "../models/Progress.js";

export async function createOrUpdateProgress(studentId, lessonId, completed) {
  return await Progress.findOneAndUpdate(
    { student: studentId, lesson: lessonId },
    { completed },
    { upsert: true, new: true } // create if not exists, return updated doc
  );
}

export async function getProgressByCourse(studentId, courseId) {
  return await Progress.find({ student: studentId })
    .populate({
      path: "lesson",
      match: { course: courseId }, // only lessons of this course
      select: "title course"
    });
}
