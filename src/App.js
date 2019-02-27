import React, { Component } from 'react';
import './App.css';
import MainMIDI from './components/MainMIDI';
import GetIcon from './components/IconsLib';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://github.com/Karmagrinder/OPZ_MIDI/blob/master/README.md" target="_blank" rel="noopener noreferrer"> 
            <GetIcon iconName="Dial" size={50} color="#039C53" strokeWidth={6}/> 
          </a>
          
        </header>        
        <div>          
            <MainMIDI/>                  
        </div>
               
      </div>
    );
  }
}

export default App;

//<img className="App-logo" alt="OPZ Dails" src={ require("./assets/opz_dails.png") } />