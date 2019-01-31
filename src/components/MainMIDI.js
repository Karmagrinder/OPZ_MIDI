import React, { Component } from 'react'
import './MainMIDI.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainMIDI extends Component{

    constructor(){
        super();
        this.state = {
            midiAccessSuccess: false,
            inputs: {},
            outputs: {},
            ModuleOutput:"",
            timingClockCount:0,
            clock:1,
            channel:1,
            note:"C",
            velocity:0
        };
        // Bind all the functions
        this.onMIDISuccess = this.onMIDISuccess.bind(this);
        this.onMIDIFailure = this.onMIDIFailure.bind(this);
        this.getMIDIMessage = this.getMIDIMessage.bind(this);
        this.noteOn = this.noteOn.bind(this);
        this.noteOff = this.noteOff.bind(this);
        this.clockHandler = this.clockHandler.bind(this);
        this.updateOutPut = this.updateOutPut.bind(this);        
    };

    
    //This is inbuilt function that get's executed before the component is mounted.
    componentWillMount(){
        navigator.requestMIDIAccess()
            .then(this.onMIDISuccess, this.onMIDIFailure);
    }

    updateOutPut(){
        this.setState({
            ModuleOutput:
                <div>
                    <Container>
                        <Row>
                            <Col>{this.state.midiAccessSuccess}</Col>
                            <Col>Clock: {this.state.clock}</Col>
                        </Row>
                        <Row>
                            <Col>Channel/Command:{this.state.channel}</Col>
                            <Col>Note: {this.state.note}</Col>
                            <Col>Velocity: {this.state.velocity}</Col>
                        </Row>
                    </Container>
                </div>
        });
    }
    

    Output() {
            return <div>{this.state.ModuleOutput}</div>            
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
        //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        
        if( command < 144)
        {
            this.noteOff(note);
        }
        else if( command < 159)
        {
            if (velocity > 0) {
                console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
                this.noteOn(command, note, velocity);
            } else {
                this.noteOff(note);
            }
        }
        else if(command === 248)
        {
            this.clockHandler();
        }


        // switch (command) {
        //     case 144: // noteOn
        //         if (velocity > 0) {
        //             console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        //             this.noteOn(command, note, velocity);
        //         } else {
        //             this.noteOff(note);
        //         }
        //         break;
        //     case 128: // noteOff
        //         this.noteOff(note);
        //         break;
            
        //     case 248: // Timing clock
        //         this.clockHandler()
        //         break;
        //     default:
        //         break;
        //     // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
        // }
    }
    
    noteOn(command, note, velocity){
        this.setState({
            channel: command,
            note: note,
            velocity: velocity 
        });
        this.updateOutPut();
    }

    noteOff(note){
        this.setState({
            note: note,
            velocity: 0
        })
        this.updateOutPut();
    }

    clockHandler(){
        if(this.state.timingClockCount < 24)
            {
                this.setState({
                    timingClockCount: this.state.timingClockCount + 1
                });
            }
        else{
            this.setState({
                timingClockCount: 0,
                clock: this.state.clock + 1
            });
            if(this.state.clock>4){
                this.setState({
                    clock: 1
                });
            }

        }
        this.updateOutPut();
    }


    render(){
        return (
            this.Output()
         ); 
        
    }
}

export default MainMIDI;