import React from 'react';
import './App.css';
import Parent from './Parent';
import Header from './Header';









function App() {
  return (
    <div className="App">
    <Header/>
      <header className="App-header">
      <Parent name="CGPAconverter" />     
      </header>
    </div>
  );
}

export default App;
