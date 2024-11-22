// App.tsx
import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import WineInputForm from './components/WineInputForm';
import WineList from './components/WineList';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../amplify_outputs.json';

// Configure Amplify with the outputs from your Amplify project
Amplify.configure(outputs);

function App({ signOut, user }) {
  return (
    <div className="app-container" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, rgb(117, 81, 194), rgb(255, 255, 255))' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white' }}>
        <h1 style={{ color: '#8B1B1B' }}>DrinksDW Collection Manager</h1>
        <button onClick={signOut}>Sign Out</button>
      </header>

      <Tabs>
        <TabItem title="Add Wine">
          <WineInputForm />
        </TabItem>
        <TabItem title="My Collection">
          <WineList />
        </TabItem>
      </Tabs>
    </div>
  );
}

export default withAuthenticator(App);