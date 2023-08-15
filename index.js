import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";

import userResolvers from "./features/users/user.resolvers.js";
import productResolvers from "./features/products/product.resolvers.js";
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

// update to make esay to load files
const typeArray = loadFilesSync('**/**/*', {
    extensions:['graphql'],
});



const resolversArray = [productResolvers,userResolvers];

const schema = makeExecutableSchema({typeDefs:typeArray,resolvers:resolversArray});

// Create an Express.js app
const app = express();

// Set up the GraphQL endpoint using graphqlHTTP middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
//   rootValue: root,
  graphiql: true, // Enable GraphiQL for testing
}));

// Start the server
const PORT = 4100;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
