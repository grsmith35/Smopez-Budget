const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const bodyParser = require("body-parser"); 

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at https://studio.apollographql.com/sandbox/explorer`);
};

startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json())

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, 'build', 'index.html')));
  // app.use(express.static('public/client'))
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // res.sendFile(path.join(__dirname + '/dist/YOURPROJECTNAME/index.html'));

});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});