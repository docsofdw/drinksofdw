import { defineBackend } from '@aws-amplify/backend';
import { Schema } from '@aws-amplify/graphql-api-construct';

// Define the backend with GraphQL schema
const backend = defineBackend({
  graphql: {
    schema: Schema.fromString(`
      type Spirit @model @auth(rules: [{allow: owner}]) {
        id: ID!
        name: String!
        producer: String!
        type: String!
        country: String!
        region: String
        abv: Float
        age: Int
        vintageYear: Int
        bottlingYear: Int
        quantity: Int!
        purchaseDate: AWSDate
        purchasePrice: Float
        estimatedValue: Float
        storageLocation: String
        tastingNotes: String
        rating: Float
        limitedEdition: Boolean
      }

      type Query {
        listSpirits: [Spirit] @function(name: "listSpirits")
        getSpirit(id: ID!): Spirit @function(name: "getSpirit")
      }

      type Mutation {
        createSpirit(input: CreateSpiritInput!): Spirit @function(name: "createSpirit")
        updateSpirit(input: UpdateSpiritInput!): Spirit @function(name: "updateSpirit")
        deleteSpirit(id: ID!): Spirit @function(name: "deleteSpirit")
      }

      input CreateSpiritInput {
        name: String!
        producer: String!
        type: String!
        country: String!
        region: String
        abv: Float
        age: Int
        quantity: Int!
      }

      input UpdateSpiritInput {
        id: ID!
        name: String
        producer: String
        type: String
        country: String
        region: String
        abv: Float
        age: Int
        quantity: Int
      }
    `)
  }
});

export default backend; 