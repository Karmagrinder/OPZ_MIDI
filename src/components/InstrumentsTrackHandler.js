import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import Card from 'react-bootstrap/Card';
import StyledProgressbar from './StyledProgressBar';

//colors
const green = "#218442";
const blue = "#028ace";
const yellow = "#ffed28";
const red = "#e20404";

class InstrumentsTrackHandler extends Component{
    constructor(props, ref){
        super(props, ref);
        this.instrumentTracks = []
        this.trackNames = ["Kick", "Snare", "HiHat", "Samples", "Bass", "Lead", "Arp", "Chord"]
        this.currentActiveTrack = {}

        this.parseMessage = this.parseMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.moduleOutput = this.moduleOutput.bind(this);
        this.midiCC = this.midiCC.bind(this);
        this.setActiveTrack = this.setActiveTrack.bind(this);
        this.saveActiveTrack = this.saveActiveTrack.bind(this);
    };

    

    componentWillMount() {
        var trackTemplate = {
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

        var i;
        for (i = 0; i <=7; i++) {
            var newTrack = Object.create(trackTemplate);
            this.instrumentTracks.push(newTrack);
            this.instrumentTracks[i].trackName = this.trackNames[i];
        }
    }

    moduleOutput(){
        return (
            <div className="Instrument-tracks-component ">
                <span>
                    <Container>
                        <Card bg='dark'>
                            <Card.Title>Track: {this.currentActiveTrack.trackName}</Card.Title>
                        </Card>
                        <Card bg="dark" text="white">
                            <Row>
                                <Col><Card.Title>Parameters: </Card.Title></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.p1} text={`P1:${this.currentActiveTrack.p1}`} color={green}/></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.p2} text={`P2:${this.currentActiveTrack.p2}`} color={blue} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.filter} text={`Filter:${this.currentActiveTrack.filter}`} color={yellow} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.resonance} text={`Reso:${this.currentActiveTrack.resonance}`} color={red} /></Col>
                            </Row>
                        </Card>                    
                        <Card bg="dark" text="white"  >
                            <Row>
                                <Col><Card.Title>Envelope:</Card.Title></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.attack} text={`A:${this.currentActiveTrack.attack}`} color={green} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.decay} text={`D:${this.currentActiveTrack.decay}`} color={blue} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.sustain} text={`S:${this.currentActiveTrack.sustain}`} color={yellow}  /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.release} text={`R:${this.currentActiveTrack.release}`} color={red} /></Col>
                            </Row>
                        </Card>                        
                        <Card bg="dark" text="white"  >
                            <Row>
                                <Col><Card.Title>LFO:</Card.Title></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.depth} text={`Depth:${this.currentActiveTrack.depth}`} color={green}/></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.rate} text={`Rate:${this.currentActiveTrack.rate}`} color={blue}/></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.dest} text={`Target:${this.currentActiveTrack.dest}`} color={yellow}/></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.shape} text={`Shape:${this.currentActiveTrack.shape}`} color={red}/></Col>
                            </Row>                            
                        </Card>
                        <Card bg="dark" text="white"  >
                            <Row>
                                <Col><Card.Title>Master:</Card.Title></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.fx1} text={`Fx1:${this.currentActiveTrack.fx1}`} color={green} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.fx2} text={`Fx2:${this.currentActiveTrack.fx2}`} color={blue} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.pan} text={`Pan:${this.currentActiveTrack.pan}`} color={yellow} /></Col>
                                <Col><StyledProgressbar percentage={this.currentActiveTrack.level} text={`Level:${this.currentActiveTrack.level}`} color={red}  /></Col>
                            </Row>                            
                        </Card>
                        
                    </Container>

                </span>
            </div>
        );
        
                 
    }

    
    setActiveTrack(trackId){
        this.currentActiveTrack = this.instrumentTracks[trackId];
    }

    saveActiveTrack(trackId){
        this.instrumentTracks[trackId] = this.currentActiveTrack;
    }

    parseMessage(message){
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
        var trackId = this.getTrackId(command);
        this.setActiveTrack(trackId);
        if (command > 175 && command < 184){
            this.midiCC(note, velocity);
        }              
        
        this.saveActiveTrack(trackId);
    }

    


    midiCC(note, velocity){
        switch(note){
            case 1:
                this.currentActiveTrack.p1 = this.convertTo100Range(velocity);
                break;
            case 2:
                this.currentActiveTrack.p2 = this.convertTo100Range(velocity);
                break;
            case 3:
                this.currentActiveTrack.filter = this.convertTo100Range(velocity);
                break;
            case 4:
                this.currentActiveTrack.resonance = this.convertTo100Range(velocity);
                break;
            case 5:
                this.currentActiveTrack.attack = this.convertTo100Range(velocity);
                break;
            case 6:
                this.currentActiveTrack.decay = this.convertTo100Range(velocity);
                break;
            case 7:
                this.currentActiveTrack.sustain = this.convertTo100Range(velocity);
                break;
            case 8:
                this.currentActiveTrack.release = this.convertTo100Range(velocity);
                break;
            case 9:
                this.currentActiveTrack.depth = this.convertTo100Range(velocity);
                break;
            case 10:
                this.currentActiveTrack.rate = this.convertTo100Range(velocity);
                break;
            case 11:
                this.currentActiveTrack.dest = this.convertTo100Range(velocity);
                break;
            case 12:
                this.currentActiveTrack.shape = this.convertTo100Range(velocity);
                break;
            case 13:
                this.currentActiveTrack.fx1 = this.convertTo100Range(velocity);
                break;
            case 14:
                this.currentActiveTrack.fx2 = this.convertTo100Range(velocity);
                break;
            case 15:
                this.currentActiveTrack.pan = this.convertTo100Range(velocity);
                break;
            case 16:
                this.currentActiveTrack.level = this.convertTo100Range(velocity);
                break;
            default:
                break;
        }

    }

    convertTo100Range(value){
        return  Math.ceil((value*100)/127);
    }

    getTrackId(command) {
        var trackId = 0
        switch (command) {
            case 176:
                trackId = 0;
                break;
            case 177:
                trackId = 1;
                break;
            case 178:
                trackId = 2;
                break;
            case 179:
                trackId = 3;
                break;
            case 180:
                trackId = 4;
                break;
            case 181:
                trackId = 5;
                break;
            case 182:
                trackId = 6;
                break;
            case 183:
                trackId = 7;
                break;
            case 144:
                trackId = 0;
                break;
            case 145:
                trackId = 1;
                break;
            case 146:
                trackId = 2;
                break;
            case 147:
                trackId = 3;
                break;
            case 148:
                trackId = 4;
                break;
            case 149:
                trackId = 5;
                break;
            case 150:
                trackId = 6;
                break;
            case 151:
                trackId = 7;
                break;
            default:
                trackId = 0;
                break;
        }
        
        return trackId;
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