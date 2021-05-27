import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import resolvers from './resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const startApolloServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      if(err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error.')
      }
      return err;
    },
    context: ( {req} ) => {
      let user = null;
      try {
        const token = req.headers.authorization.relace("Bearer: ", "");
        user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      }catch(err) {}
      return { user };
    }
  });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen({ port: 4000 }, ()=> {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startApolloServer();