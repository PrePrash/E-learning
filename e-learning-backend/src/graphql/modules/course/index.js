
import  { courseQueryResolver } from "./query.js";
import  { courseMutations } from "./mutation.js";
import  { courseSubscriptions } from "./subscription.js";

export const CourseModule = {
    Query: courseQueryResolver,
    Mutation: courseMutations,
    Subscription: courseSubscriptions,

};
