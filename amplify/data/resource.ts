import { AmplifyGraphqlApi, constructGraphqlModel } from '@aws-amplify/backend';

// Define the Spirit model using constructGraphqlModel
const spiritSchema = constructGraphqlModel({
  name: 'Spirit',
  fields: {
    name: { type: 'String', isRequired: true },
    producer: { type: 'String', isRequired: true },
    type: { type: 'String', isRequired: true },
    country: { type: 'String', isRequired: true },
    region: { type: 'String' },
    abv: { type: 'Float' }, // Alcohol by volume
    age: { type: 'Int' },
    quantity: { type: 'Int', isRequired: true }
  }
});

// Define the GraphQL API with the Spirit model
export const data = new AmplifyGraphqlApi({
  name: 'SpiritApi',
  schema: `
    type Spirit @model {
      id: ID!
      name: String!
      producer: String!
      type: String!
      country: String!
      region: String
      abv: Float
      age: Int
      quantity: Int!
    }
  `,
  authorizationConfig: {
    defaultAuthorization: {
      authorizationType: 'AMAZON_COGNITO_USER_POOLS'
    }
  }
});

// Export the schema type
export type Schema = typeof spiritSchema;
