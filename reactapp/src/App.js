import React, { Component } from 'react';
import UserInterface from './UserInterface';
import './style.css';


class App extends Component {
  render() {
    return (
        <div className="page">
          <UserInterface />
        </div>
    );
  }
}

export default App