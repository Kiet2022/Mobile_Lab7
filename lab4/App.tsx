import React from 'react';
import App_Run from './src/App_Run';

import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <App_Run />
    </PaperProvider>
  );
};

export default App;
