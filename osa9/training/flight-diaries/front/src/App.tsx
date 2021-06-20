import React from 'react';
import logo from './airplane.svg';
import './App.css';

const App: React.FC<{ name?: string }> = ({ name }) => {
  if (!name) {
    name = 'world';
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, {name}!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;