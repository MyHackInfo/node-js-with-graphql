import express from "express";
// import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";

import userResolvers from "./features/users/user.resolvers.js";
import productResolvers from "./features/products/product.resolvers.js";

// for apolloserver

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// import path from "path";
// import { fileURLToPath } from 'url';
// import {users} from "./features/users/user.model.js";
// import {products} from "./features/products/product.model.js";

// if you use __dirname then uncomment these two line with above.
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// getting model data option to use root value 
// const root = {
//     users,
//     products
// }

// old way
// const typeArray = loadFilesSync(path.join(__dirname, '**/**/*.graphql'));

const PORT = 4100;

// update to make esay to load files
const typeArray = loadFilesSync('**/**/*', {
    extensions:['graphql'],
});

const resolversArray = [productResolvers,userResolvers];

// Create an Express.js app
const app = express();

const schema = makeExecutableSchema({typeDefs:typeArray,resolvers:resolversArray});

// ...........................
// If you Want to add apolloServer in then you need to uninstall express-graphql 
// So here we can see both options 1.express-graphql and 2.ApolloServer.
// ...........................

// ############## 1.express-graphql ( graphqlHTTP ) Start ######################

// Set up the GraphQL endpoint using graphqlHTTP middleware

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
// //   rootValue: root,
//   graphiql: true, // Enable GraphiQL for testing
// }));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/graphql`);
// });

// ############## 1.express-graphql end ######################

// ############## 2.ApolloServer Start ######################

async function startApolloServer() {

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
  });
  await server.start();

  // set express middleware for apollo server..
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });

}

startApolloServer();
// ############## 2.ApolloServer end ######################

