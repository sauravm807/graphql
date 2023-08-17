const express = require('express');
const { createServer } = require('http');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/result');
require('dotenv').config();

const server = new ApolloServer({ typeDefs, resolvers });

class App {
    startApolloServer = async () => {
        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });

        const httpServer = createServer(app);

        httpServer.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}

module.exports = new App();