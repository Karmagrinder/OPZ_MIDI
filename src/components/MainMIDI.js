import React, { Component } from 'react'

class MainMIDI extends Component{

    constructor(){
        super();
        this.state = {
            midiAccessSuccess: false,
            inputs: {},
            outputs: {},
            displayMessage:""
        };
        // Bind all the functions
        this.onMIDISuccess = this.onMIDISuccess.bind(this);
        this.onMIDIFailure = this.onMIDIFailure.bind(this);
        this.getMIDIMessage = this.getMIDIMessage.bind(this);
        this.noteOn = this.noteOn.bind(this);
        this.noteOff = this.noteOff.bind(this);        
    };

    
    //This is inbuilt function that get's executed before the component is mounted.
    componentWillMount(){
        navigator.requestMIDIAccess()
            .then(this.onMIDISuccess, this.onMIDIFailure);
    }
    

    Output() {

            return <div>{this.state.displayMessage}</div>            
    }

    onMIDISuccess(midiAccess){
        this.setState({
            midiAccessSuccess: true,
            inputs: midiAccess.inputs,
            outputs: midiAccess.outputs,
            displayMessage: "This browser supports MIDI input"
         });

         for(var input of midiAccess.inputs.values()){
            input.onmidimessage = this.getMIDIMessage;
         }

        console.log("MIDI Access successful");
        console.log(midiAccess);

    }

    onMIDIFailure(){
        this.setState({
            displayMessage: "WebMIDI is not supported by this browser"
        });
        console.log('WebMIDI is not supported by this browser.');
    }

    getMIDIMessage(message) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    
        switch (command) {
            case 144: // noteOn
                if (velocity > 0) {
                    this.noteOn(note, velocity);
                } else {
                    this.noteOff(note);
                }
                break;
            case 128: // noteOff
                this.noteOff(note);
                break;
            
            default:
                break;
            // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
        }
    }
    
    noteOn(note, velocity){
        this.setState({
            displayMessage: this.state.displayMessage + "\n Note:" + note + ", Velocity:" + velocity
        })
    }

    noteOff(note){
        this.setState({
            displayMessage: this.state.displayMessage + "\n ||"
        })
    }


    render(){
        return (
            this.Output()
         ); 
        
    }
}

export default MainMIDI;