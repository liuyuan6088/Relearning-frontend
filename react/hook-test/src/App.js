import React from 'react';
import Hooks from './page/hooks';
import Hooks1 from './page/hooks/test1';

import './App.css';

export const stateContext = React.createContext("default");

function App() {
  return (
    <stateContext.Provider
      value='hahaha'
    >
      <div className="App">
        <header className="App-header">
          <Hooks />
          <Hooks1 />
        </header>
      </div>
    </stateContext.Provider>
  );
}

export default App;
