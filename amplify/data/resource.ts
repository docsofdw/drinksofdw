import { defineData, defineModel, defineField } from '@aws-amplify/backend';

// Define the Spirit model
const schema = {
  Spirit: defineModel({
    fields: {
      name: defineField('string', { required: true }),
      producer: defineField('string', { required: true }),
      type: defineField('string', { required: true }),
      country: defineField('string', { required: true }),
      region: defineField('string'),
      abv: defineField('number'), // Alcohol by volume
      age: defineField('number'),
      quantity: defineField('number', { required: true })
    }
  })
};

// Define the data configuration with authorization
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});

// Export the schema type
export type Schema = typeof schema;
