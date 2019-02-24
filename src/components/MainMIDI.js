import React, { Component } from 'react'
import './MainMIDI.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import InstrumentTrackComponent from './InstrumentsTrackHandler';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {TiMediaPlay} from 'react-icons/ti';
import {IconContext} from 'react-icons';
import {TiMediaStop} from 'react-icons/ti';
import {TiPower} from 'react-icons/ti'; 

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
            velocity:0,
            modeDisplay: "",
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
        this.setDeviceMode = this.setDeviceMode.bind(this);
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
                    <div>
                        <Card bg='dark'>
                            <div className="DeviceDetails">
                                <Container>
                                    <Row>
                                        <Col xs={2}>
                                            {this.state.midiAccessDisplay}
                                        </Col>
                                        <Col xs={2}>
                                            {this.state.modeDisplay}
                                        </Col>
                                        <Col xs={8}>
                                            <div>
                                                <b>Device:</b> {this.deviceName} &nbsp;<b>ID:</b>{this.deviceId} &nbsp;<b>Clock:</b> {this.state.clock}
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <span>
                            {this.instrumetComponentEnable && <InstrumentTrackComponent message={this.midiMessage} />}
                        </span>
                    </div>                                       
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
            midiAccessDisplay: <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                                    <div style={{padding:'2px'}}>
                                        <TiPower size={25}/>
                                    </div>
                                </IconContext.Provider>
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
            midiAccessDisplay: <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                    <div style={{padding:'2px'}}>
                                        <TiPower size={25}/>
                                    </div>
                                </IconContext.Provider>
        });
        console.log('WebMIDI is not supported by this browser.');
    }

    getMIDIMessage(message) {
        var command = message.data[0];
        
        // if(command !== 248)  // 248 is the clock message.
        // {   
        //    var note = message.data[1];
        //     var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
        //     console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        // }

        if(command === 250){ // Play button
            this.setDeviceMode(true);
        }
        if(command === 252){  // Stop button
            this.setDeviceMode(false);
        }

        //if(command >175 && command<184){
        //if ((command > 143 && command < 152) || (command > 175 && command < 184)){
        if (command > 175 && command < 184) {

            this.midiMessage = message;
            this.instrumetComponentEnable = true;
            //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity);
            this.updateOutPut();
        }
        
        // if( command < 144) // Note Off messages for channels
        // {
        //     this.noteOff(note);
        // }
        // else if( command < 159) // Note channels
        // {
        //     if (velocity > 0) {
        //         console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        //         this.noteOn(command, note, velocity);
        //     } else {
        //         this.noteOff(note);
        //     }
        // }
        // else if(command === 248) // Timing clock message
        // {
        //     this.clockHandler();
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

    setDeviceMode(playMode){
        var modeDisplay = ""
        if(playMode === true){
        
            modeDisplay = <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                            <div style={{ padding:'2px' }}>
                                <TiMediaPlay size={25}/>
                            </div>
                        </IconContext.Provider>;
        }
        else{

            modeDisplay = <IconContext.Provider value={{ color: "grey", className: "global-class-name" }}>
                            <div style={{ padding: '2px' }}>
                                <TiMediaStop size={25}/>
                            </div>
                        </IconContext.Provider>;
        }
        this.setState({
            modeDisplay: modeDisplay
        });
    }


    render(){
        return (
            this.Output()
         ); 
        
    }
}

export default MainMIDI;