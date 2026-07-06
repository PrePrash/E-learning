import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import badgeRoutes from "./routes/badge.routes.js";
import streakRoutes from "./routes/streak.routes.js";
import userRoutes from "./routes/user.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress",progressRoutes);
app.use(errorHandler);

export default app;
