import React from 'react';

import { Components } from '../../types';
import { Select } from '../select';

function App() {
  const onChange = (option?: Components.Select.OptionType, index?: number) => {
    console.log('option', option);
    console.log('index', index);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Select
        options={[
          'Education 🎓',
          'Yeeeah, science! 🚀',
          'Art 🎭',
          'Sport ⚽',
          'Game 🎮',
          'Health 👨‍⚕️',
        ]}
        // options={[]}
        onChange={onChange}
        placeholder="Select an item..."
        uniqueNewItem
      />
    </div>
  );
}

export default App;
