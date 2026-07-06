import { pubsub } from "../../pubsub.js";



export const enrollmentSubscription = {
  newStudentEnrolled: {
    subscribe: (_, { instructorId }) => {
      return pubsub.asyncIterableIterator(`STUDENT_ENROLLED_${instructorId}`);
    },
  },
};
