import React, { Component } from 'react'
import './MainMIDI.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import InstrumentTrackComponent from './InstrumentsTrackHandler';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GetIcon from './IconsLib';
import NonInstrumentTrackHandler from './NonInstrumentTrackHandler'; 

//colors
const green = "#039C53";
//const blue = "#0388C0";
//const yellow = "#DCA71B";
const red = "#C62937";
const grey = "#787878";
//const opzGrey = "#646464";
//const purple = "#9e66c1";
//const pageIconSize = 35;
//const white = "#ffffff";

const nonInstrumentTrackCommands = [152, 153, 154, 155, 156, 184, 185, 186, 187, 188];

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
            outportPort: null,
            heartbeat: null
        };

        this.midiMessage = "";
        this.instrumentComponentEnable = false;
        this.deviceName = "";
        this.deviceId = "";
        this.modeDisplay= "";
        this.fxTrackComponentEnable = false;

        // Bind all the functions
        this.onMIDISuccess = this.onMIDISuccess.bind(this);
        this.onMIDIFailure = this.onMIDIFailure.bind(this);
        this.getMIDIMessage = this.getMIDIMessage.bind(this);
        this.noteOn = this.noteOn.bind(this);
        this.noteOff = this.noteOff.bind(this);
        this.clockHandler = this.clockHandler.bind(this);
        this.updateOutput = this.updateOutput.bind(this);
        this.setDeviceMode = this.setDeviceMode.bind(this);

        this.onMIDIchanged = this.onMIDIchanged.bind(this);
        this.probeInput = this.probeInput.bind(this);
        this.probeOutput = this.probeOutput.bind(this);
        this.heartbeat = this.heartbeat.bind(this);


    };

    
    //This is inbuilt function that get's executed before the component is mounted.
    componentWillMount(){
        navigator.requestMIDIAccess( {sysex: true} )
            .then(this.onMIDISuccess, this.onMIDIFailure);
    }

    updateOutput(){
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
                                            {this.modeDisplay}
                                        </Col>
                                        <Col xs={8}>
                                            <div>
                                                <b>Device:</b> {this.deviceName} &nbsp;<b>ID:</b>{this.deviceId}
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <span>
                            {this.instrumentComponentEnable && <InstrumentTrackComponent message={this.midiMessage} />}
                        </span>
                    </div>
                    <div>
                        <span>
                            {this.fxTrackComponentEnable && <NonInstrumentTrackHandler message={this.midiMessage} />}
                        </span>
                    </div>                                        
                </div>
        });
    }
    

    Output() {
            return <div>{this.state.ModuleOutput}</div>            
    }

    probeInput(input) {
        if (input.name === "OP-Z") {
            input.onmidimessage = this.getMIDIMessage;
            this.deviceId = input.id;
            this.deviceName = input.name;
        }
    }

    probeOutput(output) {
        if (output.name === "OP-Z") {
            this.setState({outputPort: output });
            let intervalId = setInterval(this.heartbeat, 1000);
            this.setState({heartbeat:intervalId});
        }
    }

    heartbeat() {
        if (this.state.outputPort === null) {
            clearInterval(this.state.heartbeat);
            return;
        }
        if (this.state.outputPort.state === "disconnected") {
            clearInterval(this.state.heartbeat);
            return;
        }
        this.state.outputPort.send([0xf0, 0x00, 0x20, 0x76, 0x01, 0x00, 0x03, 0x2d, 0x0e, 0x05, 0xf7 ]);
        //console.log("Heartbeat");

    }


    onMIDISuccess(midiAccess){
        this.setState({
           midiAccessSuccess: true,
           inputs: midiAccess.inputs,
           outputs: midiAccess.outputs,
           displayMessage: "This browser supports MIDI input",
           midiAccessDisplay: <GetIcon iconName="MIDI" size={30} strokeWidth={7} color={green} />
        });

        for(var input of midiAccess.inputs.values()){
            this.probeInput(input);
        }
        for(var output of midiAccess.outputs.values()) {
            this.probeOutput(output);
        }
        midiAccess.onstatechange = this.onMIDIchanged;

        console.log("MIDI Access successful");
        console.log(midiAccess);
    }

    onMIDIchanged(event) {
        if (event.port.state === "disconnected") {
            if (this.state.outputPort === event.port) {
                this.state.outputPort = null;
            }
        }
        if (event.port.type === "input") {
            this.probeInput(event.port);
        } else {
            this.probeOutput(event.port);
        }
    }

    onMIDIFailure(){
        this.setState({
            midiAccessSuccess: false,
            displayMessage: "WebMIDI is not supported by this browser",
            midiAccessDisplay: <GetIcon iconName="Dial" size={30} color={red}/>
        });
        console.log('WebMIDI is not supported by this browser.');
    }

    getMIDIMessage(message) {
        var command = message.data[0];

        if (command === 0xf0) {
            if (message.data[5] === 0x0e) {
                this.midiMessage = message;
                this.instrumentComponentEnable = true;
                this.updateOutput();
            }
        }


        
        if(command !== 248)  // 248 is the clock message.
        {
           var note = message.data[1];
           var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
           console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        }

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
            this.instrumentComponentEnable = true;
            //this.fxTrackComponentEnable = false;
            //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity);
            this.updateOutput();
        }

        if (nonInstrumentTrackCommands.includes(command)) {

            this.midiMessage = message;
            //this.instrumentComponentEnable = false;
            this.fxTrackComponentEnable = true;
            //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity);
            this.updateOutput();
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
        this.updateOutput();
    }

    noteOff(note){
        this.setState({
            note: note,
            velocity: 0
        });
        this.updateOutput();
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
        this.updateOutput();
    }

    setDeviceMode(playMode){
        if(playMode === true){
        
            this.modeDisplay = <GetIcon iconName="Play" size={30} color={green}/>;
        }
        else{

            this.modeDisplay = <GetIcon iconName="Stop" size={30} color={grey} />;
        }
        this.updateOutput();        
    }


    render(){
        if(this.state.ModuleOutput === ""){
            return(
                <Card bg='dark' text='info'> Click the dial above for help, or turn one of the dials on OP-Z.</Card>
            );
        }
        return (
            this.Output()
         ); 
        
    }
}

export default MainMIDI;