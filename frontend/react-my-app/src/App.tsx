import React, { useEffect } from 'react';
// @ts-ignore
import {loadCHainGate} from '@chaingate/chaingate-js';
import './App.css';

function App() {
  let chg = loadCHainGate("abcde", "#container", "http://localhost:8000");

  useEffect(() => {
    chg.render()
  }, [chg])


  return (
    <div className="App">
      <div id={"container"}></div>
    </div>
  );
}

export default App;
