import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import MONGODB from "./config.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB.dbConnection, { useNewUrlParser: true })
  .then(() => {
    console.log(`MongoDB connected`);
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
