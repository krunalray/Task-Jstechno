const { ApolloServer, gql } = require('apollo-server');

// Mock database (JavaScript object)
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  // More mock data
];

// Define GraphQL schema
const typeDefs = gql`
 
  type Lead {
    id:ID
    name:String
    status:String
  }
  type Query {
    leads: [Lead]
    lead(id: ID!): Lead
  }

`;

// Define resolvers to handle queries
const resolvers = {
  Query: {
    leads: () => leads,
    lead: (parent, { id }) => leads.find(lead => lead.id === id)
  }
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});