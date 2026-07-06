import { pubsub } from "../../pubsub.js";

export const courseSubscriptions = {
  courseCreated: {
    subscribe: () => pubsub.asyncIterableIterator(["COURSE_CREATED"]),
  },
};


// import { pubsub } from "../../server/pubsub.js";

// export const chatSubscriptionResolvers = {
//   UserJoined: {
//     subscribe: () => pubsub.asyncIterableIterator(["User_joined"]),
//   },
//   UserLogout: {
//     subscribe: () => pubsub.asyncIterableIterator(["User_Logout"]),
//   },
// };
