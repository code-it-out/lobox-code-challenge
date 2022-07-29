import React from 'react';

import { Components } from '../../types';
import Select from '../select/Select';

function App() {
  const onChange = (option: Components.Select.Option) => {
    console.log('onChange', option);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Select
        options={[
          { label: 'Education 🎓', text: 'Education' },
          { label: 'Yeeeah, science! 🚀', text: 'Science' },
          { label: 'Art 🎭', text: 'Art' },
          { label: 'Sport ⚽', text: 'Sport' },
          { label: 'Game 🎮', text: 'Game' },
          { label: 'Health 👨‍⚕️', text: 'Health' },
        ]}
        onChange={onChange}
        placeholder="Select an item..."
      />
    </div>
  );
}

export default App;
