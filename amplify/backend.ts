import { defineBackend } from '@aws-amplify/backend';
import { AmplifyAuth } from '@aws-amplify/backend';
import { AmplifyGraphqlApi } from '@aws-amplify/backend';

// Define the Auth resource
export const auth = new AmplifyAuth({
  cognitoUserPool: {
    mfa: {
      mfaTypes: [], // e.g., "SMS" if needed
      smsMessage: '',
    },
    passwordPolicy: {
      minimumLength: 8,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true,
    },
    requiredAttributes: ['email'],
    usernameAttributes: ['email'],
  },
});

// Define the Data resource (GraphQL API)
export const data = new AmplifyGraphqlApi({
  schema: `
    type Wine @model {
      id: ID!
      name: String!
      producer: String!
      vintage: String!
      country: String!
      region: String!
      subRegion: String
      wineType: String!
      variety: String!
      quantity: Int!
      bottleSize: Int!
      purchaseDate: AWSDate
      purchasePrice: Float
      storageLocation: String
      tastingNotes: String
      createdAt: AWSDateTime
      updatedAt: AWSDateTime
    }
  `,
  authorizationConfig: {
    defaultAuthorization: {
      authorizationType: 'AMAZON_COGNITO_USER_POOLS',
    },
    additionalAuthorizationModes: [
      {
        authorizationType: 'API_KEY',
      },
    ],
  },
});

// Define the backend
defineBackend({
  auth,
  data,
});
