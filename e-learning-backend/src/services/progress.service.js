import Badges from "../models/Badges.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";
import * as progressRepo from "../repository/progress.repository.js";

// export async function updateProgress(studentId, lessonId, completed) {
//   const lesson = await Lesson.findById(lessonId);
//   if (!lesson) throw new Error("Lesson not found");

//   // Create/update progress with course + lesson
//   const progress = await Progress.findOneAndUpdate(
//     { student: studentId, lesson: lessonId },
//     { completed, course: lesson.course },
//     { upsert: true, new: true }
//   );

//   if (completed) {
//     // ✅ Award points only first time
//     const wasAlreadyCompleted = progress.completed;
//     if (!wasAlreadyCompleted && typeof lesson.points === "number") {
//       await User.findByIdAndUpdate(
//         studentId,
//         { $inc: { points: lesson.points } },
//         { new: true }
//       );
//     }

//     // ✅ Check if all lessons in course are completed
//     const course = await Course.findById(lesson.course).populate("lessons");
//     const completedLessons = await Progress.find({
//       student: studentId,
//       course: course._id,
//       completed: true,
//     }).countDocuments();

//     if (completedLessons === course.lessons.length) {
//       // Award course badge
//       if (course.badge) {
//         let badge = await Badge.findOne({ name: course.badge });

//         // if not already existing in badge collection, create
//         if (!badge) {
//           badge = await Badges.create({
//             name: course.badge,
//             description: `Completed all lessons in ${course.title}`,
//             icon: course.image,
//           });
//         }

//         // ✅ Add badge to user if not already owned
//         await User.findByIdAndUpdate(studentId, {
//           $addToSet: { badges: badge._id }, // prevents duplicates
//         });
//       }
//     }
//   }

//   return progress;
// }
export async function updateProgress(studentId, lessonId, completed) {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  // ✅ fetch old progress BEFORE updating
  const oldProgress = await Progress.findOne({ student: studentId, lesson: lessonId });

  // ✅ update or create new progress
  const progress = await Progress.findOneAndUpdate(
    { student: studentId, lesson: lessonId },
    { completed, course: lesson.course },
    { upsert: true, new: true }
  );

  // ✅ award points only first-time completion
  const isFirstCompletion = completed && (!oldProgress || !oldProgress.completed);
  if (isFirstCompletion && typeof lesson.points === "number") {
    await User.findByIdAndUpdate(
      studentId,
      { $inc: { points: lesson.points } },
      { new: true }
    );
  }

  // ✅ check if ALL lessons are completed
  if (completed) {
    const course = await Course.findById(lesson.course).populate("lessons");

    const completedLessonsCount = await Progress.countDocuments({
      student: studentId,
      course: course._id,
      completed: true,
    });

    if (completedLessonsCount === course.lessons.length) {
      // award badge
      if (course.badge) {
        let badge = await Badges.findOne({ name: course.badge });

        if (!badge) {
          badge = await Badges.create({
            name: course.badge,
            description: `Completed all lessons in ${course.title}`,
            icon: course.image,
          });
        }

        await User.findByIdAndUpdate(studentId, {
          $addToSet: { badges: badge._id }, // prevents duplicate
        });
      }
    }
  }

  return progress;
}
export async function getCourseProgress(studentId, courseId) {
  return await progressRepo.getProgressByCourse(studentId, courseId);
}
