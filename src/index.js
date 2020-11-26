const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
let users = {
  1: {
    id: "1",
    username: "rmac",
    messageIds: [1],
  },
  2: {
    id: "2",
    username: "user2",
    messageIds: [2],
  },
};
let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "Bye World",
    userId: "2",
  },
};

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  User: {
    messages: (user) => {
      return Object.values(messages).filter(
        (message) => message.userId === user.id
      );
    },
  },
  Message: {
    user: (message) => {
      return users[message.userId];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app });

app.listen({ port: 8000 }, () => {
  console.log(`Apollo Server on http://localhost:8000/graphql`);
});
