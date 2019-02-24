import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import Card from 'react-bootstrap/Card';
import StyledProgressbar from './StyledProgressBar';
import { MdSettingsInputComponent, MdAudiotrack} from 'react-icons/md';
import { IoIosAnalytics, IoIosStats, IoMdOptions, IoMdMusicalNotes} from 'react-icons/io';
import {GiPeach, GiDrum, GiFrisbee, GiSoundWaves } from 'react-icons/gi';
import {GoBold, GoKebabHorizontal} from 'react-icons/go';

//colors
const green = "#039C53";
const blue = "#0388C0";
const yellow = "#DCA71B";
const red = "#C62937";
//const grey = "#787878";
//const opzGrey = "#646464";
const purple = "#9e66c1";

function getTrackIcon(trackName){
    var trackIcon = "";
    switch (trackName){
        case "Kick":
            trackIcon = <div>
                            <GiPeach size={25} /> Kick
                        </div>                
            break;
        case "Snare":        
                trackIcon = <div>
                                <GiDrum size={25}/> Snare
                            </div>
            break;
        case "HiHat":
            trackIcon = 
                        <div>
                            <GiFrisbee size={25} /> HiHat
                        </div>
            break;
        case "Samples":
            trackIcon = <div>
                            <GiSoundWaves size={25} /> Samples
                        </div>
            break;
        case "Bass":
            trackIcon = <div>
                            <GoBold size={25} /> Bass
                        </div>
            break;
        case "Lead":
            trackIcon = <div>
                            <MdAudiotrack size={25} /> Lead
                        </div>
            break;
        case "Arp":
            trackIcon = <div>
                            <GoKebabHorizontal size={25} /> Arp
                        </div>
            break;
        case "Chord":
            trackIcon = <div>
                            <IoMdMusicalNotes size={25} /> Chord
                        </div>
            break;
        default:
            break;
    }
    return trackIcon;    
}


function InstrumentTrack(props){
    return (
        <div className="Instrument-tracks-component">
            <Card bg='dark' style={{ color: blue}} >
                <Card.Title>{getTrackIcon(props.track.trackName)}</Card.Title>
                <Card bg="dark" text='white'>
                    <Row>
                        <Col><Card.Title><IoMdOptions size={25}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.p1} text={`P1:${props.track.p1}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.p2} text={`P2:${props.track.p2}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.filter} text={`Filter:${props.track.filter}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.resonance} text={`Reso:${props.track.resonance}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" text='success'  >
                    <Row>
                        <Col><Card.Title><IoIosStats size={25}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.attack} text={`A:${props.track.attack}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.decay} text={`D:${props.track.decay}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.sustain} text={`S:${props.track.sustain}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.release} text={`R:${props.track.release}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" style={{ color: purple }}  >
                    <Row>
                        <Col><Card.Title><IoIosAnalytics size={25}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.depth} text={`Depth:${props.track.depth}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.rate} text={`Rate:${props.track.rate}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.dest} text={`Target:${props.track.dest}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.shapeVal} text={`${props.track.shape}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" style={{ color: yellow }}  >
                    <Row>
                        <Col><Card.Title><MdSettingsInputComponent size = {25}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.fx1} text={`Fx1:${props.track.fx1}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.fx2} text={`Fx2:${props.track.fx2}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.pan} text={`Pan:${props.track.pan}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.level} text={`Level:${props.track.level}`} color={red} /></Col>
                    </Row>
                </Card>
            </Card>
        </div>
    );
}

export default InstrumentTrack;