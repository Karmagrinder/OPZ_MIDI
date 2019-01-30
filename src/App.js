import React, { Component } from 'react';
import './App.css';
import MainMIDI from './components/MainMIDI';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            This is MIDI Jävel.
          </p>
          
        </header>        
        <div>          
            <MainMIDI/>                  
        </div>
               
      </div>
    );
  }
}

export default App;
