

import Course from "../../../models/Course.js";
import { pubsub } from "../../pubsub.js";



export const courseMutations = {
  createCourse: async (_, { input }, { user }) => {
     console.log("createCourse context.user:", user);
    if (!user) throw new Error("Unauthorized");
    if (user.role !== "instructor") throw new Error("Forbidden");


    const course = new Course({
      ...input,
      instructor: user.id,
    });

    await course.save();
    pubsub.publish("COURSE_CREATED", { courseCreated: course });

    return course;
  },
};


// export const chatMutation = {
//   register: async (_, { name, email, role, password }) => {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       throw new Error("User already exists");
//     }
//     const newUser = new User({ name, email, role, password, isOnline: false });
//     await newUser.save();

//     return newUser;
//   },

// pubsub.publish("User_joined", {
//       UserJoined: { userMessage: `${user.name} logged in` },
//     });
