import React, { Component } from 'react'

class MainMIDI extends Component{

    constructor(props){
        super(props);
        this.state = {
            inputs: undefined,
            outputs: undefined
        };
    };

    

    Init() {

        navigator.requestMIDIAccess()
            .then(this.onMIDISuccess.bind(this), this.onMIDIFailure);
    }

    onMIDISuccess(midiAccess){
        console.log(midiAccess);
        
        this.setState({
            inputs: midiAccess.inputs,
            outputs: midiAccess.outputs 
         });
         
         return <div>This browser supports webMIDI</div>
    }

    onMIDIFailure(){
        console.log('WebMIDI is not supported by this browser.');
        return <div>WebMIDI is not supported by this browser.</div>
    }


    render(){
        return (
            this.Init()
         ); 
        
    }
}

export default MainMIDI;