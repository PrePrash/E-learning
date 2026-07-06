import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  streak: { type: Number, default: 0 ,  required: function() {
      return this.role === "student"; 
    }},
  points: { type: Number, default: 0, required: function() {
      return this.role === "student";  
    }
  },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
