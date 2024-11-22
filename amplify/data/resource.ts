import { AmplifyGraphqlApi, constructGraphqlModel } from '@aws-amplify/backend';

const wineSchema = constructGraphqlModel({
  name: 'Wine',
  fields: {
    name: { type: 'String', isRequired: true },
    producer: { type: 'String', isRequired: true },
    vintage: { type: 'String', isRequired: true },
    country: { type: 'String', isRequired: true },
    region: { type: 'String', isRequired: true },
    subRegion: { type: 'String' },
    wineType: { type: 'String', isRequired: true },
    variety: { type: 'String', isRequired: true },
    quantity: { type: 'Int', isRequired: true },
    bottleSize: { type: 'Int', isRequired: true },
    purchaseDate: { type: 'AWSDate' },
    purchasePrice: { type: 'Float' },
    storageLocation: { type: 'String' },
    tastingNotes: { type: 'String' }
  }
});

export const data = new AmplifyGraphqlApi({
  name: 'WineApi',
  schema: `
    type Wine @model {
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
    }
  `,
  authorizationConfig: {
    defaultAuthorization: {
      authorizationType: 'AMAZON_COGNITO_USER_POOLS'
    }
  }
});

export type Schema = typeof data;
