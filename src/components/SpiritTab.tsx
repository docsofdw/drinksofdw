// components/SpiritTabs.tsx
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const SpiritTabs = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <Tabs
      currentIndex={activeTab === 'inventory' ? 0 : 1}
      onChange={(index) => setActiveTab(index === 0 ? 'inventory' : 'add')}
    >
      <TabItem title="Inventory">
        {/* Your inventory component */}
      </TabItem>
      <TabItem title="Add Spirit">
        {/* Your add spirit form component */}
      </TabItem>
    </Tabs>
  );
};

export default SpiritTabs;