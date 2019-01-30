import React, { Component } from 'react'

class MainMIDI extends Component{

    constructor(){
        super();
        this.state = {
            inputs: {},
            outputs: {},
            updateComponent: true
        };
        this.onMIDISuccess = this.onMIDISuccess.bind(this);
    };

    shouldComponentUpdate(){
        return this.state.updateComponent;
    }
    

    Init() {

        navigator.requestMIDIAccess()
            .then(this.onMIDISuccess.bind(this), this.onMIDIFailure);
        
            return <div>
                {this.state.inputs.size} ,
                {this.state.outputs.size}
            </div>
    }

    onMIDISuccess(midiAccess){
        this.setState({
            inputs: midiAccess.inputs,
            outputs: midiAccess.outputs,
            updateComponent: false 
         });
        console.log("MIDI Access successful");
        console.log(midiAccess);
        return (<div>This browser supports webMIDI</div>);
    }

    onMIDIFailure(){
        console.log('WebMIDI is not supported by this browser.');
        return (<div>WebMIDI is not supported by this browser.</div>);
    }


    render(){
        return (
            this.Init()
         ); 
        
    }
}

export default MainMIDI;