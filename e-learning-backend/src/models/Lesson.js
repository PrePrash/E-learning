import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  content: [
    {
      type: {
        type: String,
        enum: ["text", "list", "code", "note", "quiz", "image"],
        required: true
      },
      data: mongoose.Schema.Types.Mixed // can be string, array, or object
    }
  ],
  points: {
    type: Number,
    required: true,
    min: 1
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false
  }
}, { timestamps: true });


export default mongoose.model("Lesson", lessonSchema);



