import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import Card from 'react-bootstrap/Card';

class InstrumentsTrackHandler extends Component{
    constructor(props, ref){
        super(props, ref);
        this.trackProperties = {
            trackName: "",
            p1: "",
            p2: "",
            filter: "",
            resonance: "",
            attack: "",
            decay: "",
            sustain: "",
            release: "",
            depth: "",
            rate: "",
            dest: "",
            shape: "",
            fx1: "",
            fx2: "",
            pan: "",
            level: ""            
        }
        this.parseMessage = this.parseMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.moduleOutput = this.moduleOutput.bind(this);
        this.getTrackName = this.getTrackName.bind(this);
        this.handleNote = this.handleNote.bind(this);
    };

    moduleOutput(){
        return (
            <div className = "container">
                    Track: {this.trackProperties.trackName}
                    <Container>
                        <Card>
                            <Row>
                                <Col> Parameters: </Col>
                                <Col> P1: {this.trackProperties.p1}</Col>
                                <Col> P2: {this.trackProperties.p2}</Col>
                                <Col> Filter: {this.trackProperties.filter}</Col>
                                <Col> Resonance: {this.trackProperties.resonance}</Col>
                            </Row>
                        </Card>                    
                        <Card>
                            <Row>
                                <Col> Envelope: </Col>
                                <Col> Attack: {this.trackProperties.attack}</Col>
                                <Col> Decay: {this.trackProperties.decay}</Col>
                                <Col> Sustan: {this.trackProperties.sustain}</Col>
                                <Col> Release: {this.trackProperties.release}</Col>
                            </Row>
                        </Card>
                        
                        <Card>
                            <Row>
                                <Col> LFO: </Col>
                                <Col> Depth: {this.trackProperties.depth}</Col>
                                <Col> Rate: {this.trackProperties.rate}</Col>
                                <Col> Dest: {this.trackProperties.dest}</Col>
                                <Col> Shape: {this.trackProperties.shape}</Col>
                            </Row>
                        </Card>
                        <Card>
                            <Row>
                                <Col> Master: </Col>
                                <Col> Fx1: {this.trackProperties.fx1}</Col>
                                <Col> Fx2: {this.trackProperties.fx2}</Col>
                                <Col> Pan: {this.trackProperties.pan}</Col>
                                <Col> Level: {this.trackProperties.level}</Col>
                            </Row>
                        </Card>
                        
                    </Container>
            </div>
        );
        
                 
    }

    parseMessage(message){
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
        //console.log("Command:"+ command + ", Note:" + note + ",Velocity:" + velocity)
        
        this.trackProperties.trackName = this.getTrackName(command);
        
        this.handleNote(note, velocity);
        
        //this.updateOutput();
    }

    handleNote(note, velocity){
        switch(note){
            case 1:
                this.trackProperties.p1 = this.convertTo100Range(velocity);
                break;
            case 2:
                this.trackProperties.p2 = this.convertTo100Range(velocity);
                break;
            case 3:
                this.trackProperties.filter = this.convertTo100Range(velocity);
                break;
            case 4:
                this.trackProperties.resonance = this.convertTo100Range(velocity);
                break;
            case 5:
                this.trackProperties.attack = this.convertTo100Range(velocity);
                break;
            case 6:
                this.trackProperties.decay = this.convertTo100Range(velocity);
                break;
            case 7:
                this.trackProperties.sustain = this.convertTo100Range(velocity);
                break;
            case 8:
                this.trackProperties.release = this.convertTo100Range(velocity);
                break;
            case 9:
                this.trackProperties.depth = this.convertTo100Range(velocity);
                break;
            case 10:
                this.trackProperties.rate = this.convertTo100Range(velocity);
                break;
            case 11:
                this.trackProperties.dest = this.convertTo100Range(velocity);
                break;
            case 12:
                this.trackProperties.shape = this.convertTo100Range(velocity);
                break;
            case 13:
                this.trackProperties.fx1 = this.convertTo100Range(velocity);
                break;
            case 14:
                this.trackProperties.fx2 = this.convertTo100Range(velocity);
                break;
            case 15:
                this.trackProperties.pan = this.convertTo100Range(velocity);
                break;
            case 16:
                this.trackProperties.level = this.convertTo100Range(velocity);
                break;
            default:
                break;
        }

    }

    convertTo100Range(value){
        return  Math.ceil((value*100)/127);
    }

    getTrackName(command){
        var trackName = ""
        switch(command){
            case 176:
                trackName = "Kick";
                break;
            case 177:
                trackName = "Snare";
                break;
            case 178:
                trackName = "HiHat";
                break;
            case 179:
                trackName = "Samples";
                break;
            case 180:
                trackName = "Bass";
                break;
            case 181:
                trackName = "Lead";
                break;
            case 182:
                trackName = "Arp";
                break;
            case 183:
                trackName = "Chord";
                break;
            default:
                break;
        }
        return trackName
    }

    handleMessage(midiMessage){
        this.parseMessage(midiMessage);        
        return this.moduleOutput();
    }    

    render(){
        return(
            this.handleMessage(this.props.message)
        );
    }

}

export default InstrumentsTrackHandler;