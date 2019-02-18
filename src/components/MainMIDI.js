import React, { Component } from 'react'
import './MainMIDI.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import InstrumentTrackComponent from './InstrumentsTrackHandler';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainMIDI extends Component{

    constructor(){
        super();
        this.state = {
            midiAccessSuccess: false,
            midiAccessDisplay:"",
            inputs: {},
            outputs: {},
            ModuleOutput:"",
            timingClockCount:0,
            clock:1,
            channel:1,
            note:"C",
            velocity:0
        };

        this.midiMessage = "";
        this.instrumetComponentEnable = false;
        this.deviceName = "";
        this.deviceId = "";

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
                <div className="OutputModule"> 
                    <Card bg='dark' style={{ height: '6rem' }}>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <div style={{width:'70px', padding:'2px'}}>
                                            {this.state.midiAccessDisplay}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="DeviceDetails">
                                            <b>Device:</b> {this.deviceName} &nbsp;<b>ID:</b> {this.deviceId}
                                            <br/>
                                            <b>Clock:</b> {this.state.clock}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>

                    </Card>
                    <Card bg='dark'>
                        <div>
                            {this.instrumetComponentEnable && <InstrumentTrackComponent message={this.midiMessage} />}
                        </div>
                    </Card>                    
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
            displayMessage: "This browser supports MIDI input",
            midiAccessDisplay: <Alert variant="success">[|]</Alert>
         });

         for(var input of midiAccess.inputs.values()){
            input.onmidimessage = this.getMIDIMessage;
            this.deviceId = input.id;
            this.deviceName = input.name;
        }

        console.log("MIDI Access successful");
        console.log(midiAccess);

    }

    onMIDIFailure(){
        this.setState({
            midiAccessSuccess: false,
            displayMessage: "WebMIDI is not supported by this browser",
            midiAccessDisplay: <Alert variant="danger">[0]]</Alert>
        });
        console.log('WebMIDI is not supported by this browser.');
    }

    getMIDIMessage(message) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

        if(command !== 248)
        {
            console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        }

        //if(command >175 && command<184){
        if ((command > 143 && command < 152) || (command > 175 && command < 184)){
            this.midiMessage = message;
            this.instrumetComponentEnable = true;
            //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity);
            this.updateOutPut();
        }
        
        if( command < 144) // Note Off messages for channels
        {
            this.noteOff(note);
        }
        else if( command < 159) // Note channels
        {
            if (velocity > 0) {
                console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
                this.noteOn(command, note, velocity);
            } else {
                this.noteOff(note);
            }
        }
        else if(command === 248) // Timing clock message
        {
            this.clockHandler();
        }

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