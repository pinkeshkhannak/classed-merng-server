import postResolvers from './posts.js';
import userResolvers from './users.js';
import commentsResolvers from './comments.js'

const resolvers = {
    Post: {
        likeCount(parent) {
            return parent.likes.length;
        },
        commentCount:(parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}

export default resolvers;