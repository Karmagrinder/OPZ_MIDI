import React, { Component } from 'react';
import './App.css';
import MainMIDI from './components/MainMIDI';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="OPZ Dails" src={ require("./assets/opz_dails.png") } />          
        </header>        
        <div>          
            <MainMIDI/>                  
        </div>
               
      </div>
    );
  }
}

export default App;
