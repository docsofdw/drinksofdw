import { defineBackend, defineAuth, defineData } from '@aws-amplify/backend';

// Define the authentication configuration
const auth = defineAuth({
  cognitoUserPool: {
    mfa: {
      mfaTypes: [], // Specify MFA types if needed
      smsMessage: '', // Customize SMS message if using SMS MFA
    },
    passwordPolicy: {
      minimumLength: 8,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true,
    },
    requiredAttributes: ['email'], // Ensure email is a required attribute
  },
});

// Define the GraphQL API configuration
const data = defineData({
  schema: {
    Spirit: {
      fields: {
        name: { type: 'string', required: true },
        producer: { type: 'string', required: true },
        type: { type: 'string', required: true },
        country: { type: 'string', required: true },
        region: { type: 'string' },
        abv: { type: 'number' }, // Alcohol by volume
        age: { type: 'number' },
        quantity: { type: 'number', required: true },
      },
    },
  },
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

// Define the backend with auth and data configurations
defineBackend({
  auth,
  data,
});
