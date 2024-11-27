// App.tsx
import React from 'react';
import { Amplify } from 'aws-amplify';
import { SpiritTabs } from './components/SpiritTabs';
import awsconfig from './aws-exports';

// Configure Amplify with the AWS configuration
Amplify.configure(awsconfig);

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, rgb(117, 81, 194), rgb(255, 255, 255))' }}>
      <header style={{ display: 'flex', justifyContent: 'center', padding: '1rem', backgroundColor: 'white' }}>
        <h1 style={{ color: '#8B1B1B' }}>Spirit Collection Manager</h1>
      </header>
      <SpiritTabs />
    </div>
  );
}

export default App;