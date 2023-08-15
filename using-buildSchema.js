import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
// Sample data
let users = [
  { id: '1', name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: '2', name: 'Bob', email: 'bob@example.com', age: 30 },
];

// Construct a schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): ID!
  }
`);

// Resolver functions
const root = {
  getUser: ({ id }) => users.find(user => user.id === id),
  getAllUsers: () => users,
  createUser: ({ name, email, age }) => {
    const newUser = { id: String(users.length + 1), name, email, age };
    users.push(newUser);
    return newUser;
  },
  updateUser: ({ id, name, email, age }) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (age) users[userIndex].age = age;

    return users[userIndex];
  },
  deleteUser: ({ id }) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    users.splice(userIndex, 1);
    return id;
  },
};

// Create an Express.js app
const app = express();

// Set up the GraphQL endpoint using graphqlHTTP middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing
}));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
