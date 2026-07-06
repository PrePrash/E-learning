
import  { CourseModule } from "../modules/course/index.js";
import { EnrollmentModule } from "../modules/enrollment/index.js";

export const resolvers = {
    Query : {
        ...CourseModule.Query,
        ...EnrollmentModule.Query
    },
    Mutation : {
        ...CourseModule.Mutation,
        ...EnrollmentModule.Mutation
    },
    Subscription : {
        ...CourseModule.Subscription,
        ...EnrollmentModule.Subscription
    }
}