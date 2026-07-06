import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  badge: String,
  image: { type: String, default: "https://via.placeholder.com/150" },
  price: { type: Number, default: 0 },
  category: String,
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
