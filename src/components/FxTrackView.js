import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import Card from 'react-bootstrap/Card';
import StyledProgressbar from './StyledProgressBar';
import GetIcon from './IconsLib';


//colors
const green = "#039C53";
const blue = "#0388C0";
const yellow = "#DCA71B";
const red = "#C62937";
//const grey = "#787878";
//const opzGrey = "#646464";
//const purple = "#9e66c1";
const pageIconSize = 35;
const white = "#ffffff";


function fxTrackView(track){

    return <div className="Instrument-tracks-component">
                <Card bg='dark' style={{ color: blue }} >
                    <Card bg="dark" text='white'>
                        <Row>
                            <Col><Card.Title><GetIcon iconName="Params" size={pageIconSize} color={white} /></Card.Title></Col>
                            <Col><StyledProgressbar percentage={track.p1} text={`P1:${track.p1}`} color={green} /></Col>
                            <Col><StyledProgressbar percentage={track.p2} text={`P2:${track.p2}`} color={blue} /></Col>
                            <Col><StyledProgressbar percentage={track.filter} text={`Filter:${track.filter}`} color={yellow} /></Col>
                            <Col><StyledProgressbar percentage={track.resonance} text={`Reso:${track.resonance}`} color={red} /></Col>
                        </Row>
                    </Card>
                    <Card bg="dark" text='success'  >
                        <Row>
                            <Col><Card.Title>Takt:</Card.Title></Col>
                            <Col>{track.timeSignature}</Col>
                        </Row>
                    </Card>
                </Card>
            </div>
}

function tapeTrackView(track) {

    return <div className="Instrument-tracks-component">
        <Card bg='dark' style={{ color: blue }} >
            <Card bg="dark" text='white'>
                <Row>
                    <Col><Card.Title><GetIcon iconName="Params" size={pageIconSize} color={white} /></Card.Title></Col>
                    <Col><StyledProgressbar percentage={track.p1} text={`Speed:${track.p1}`} color={green} /></Col>
                    <Col><StyledProgressbar percentage={track.p2} text={`Fine:${track.p2}`} color={blue} /></Col>
                    <Col><StyledProgressbar percentage={track.filter} text={`Filter:${track.filter}`} color={yellow} /></Col>
                    <Col><StyledProgressbar percentage={track.resonance} text={`Reso:${track.resonance}`} color={red} /></Col>
                </Row>                
            </Card>
            <Card bg='dark' text='success'>
                <Row>
                    <Col><Card.Title><GetIcon iconName="Buffer" size={pageIconSize} color={white} /></Card.Title></Col>
                    <Col> <b>Buffer segment length: </b>{track.tapeBufferSegmentLength}</Col>
                    <Col><b>Buffer segment: </b>{track.tapeBufferSegment}</Col>
                </Row>
            </Card>            
        </Card>
    </div>
}

function masterTrackView(track) {

    return <div className="Instrument-tracks-component">
        <Card bg='dark' style={{ color: blue }} >
            <Card bg="dark" text='white'>
                <Row>
                    <Col><Card.Title><GetIcon iconName="Params" size={pageIconSize} color={white} /></Card.Title></Col>
                    <Col><StyledProgressbar percentage={track.p1} text={`Chorus:${track.p1}`} color={green} /></Col>
                    <Col><StyledProgressbar percentage={track.p2} text={`Drive:${track.p2}`} color={blue} /></Col>
                    <Col><StyledProgressbar percentage={track.filter} text={`Filter:${track.filter}`} color={yellow} /></Col>
                    <Col><StyledProgressbar percentage={track.resonance} text={`Reso:${track.resonance}`} color={red} /></Col>
                </Row>
            </Card>
        </Card>
    </div>
}

function performanceTrackView(track) {

    return <div className="Instrument-tracks-component">
        <Card bg='dark' style={{ color: blue }} >
            <Card bg="dark" text='success'>
                <Row>
                    <Col>{track.performanceEffect}</Col>                    
                </Row>
            </Card>
        </Card>
    </div>
}

function getTrackView(track) {
    var trackView = "";
    switch (track.trackName){
        case "Fx1":
            trackView = fxTrackView(track);
            break;
        case "Fx2":
            trackView = fxTrackView(track);
            break;
        case "Tape":
            trackView = tapeTrackView(track);
            break;
        case "Master":
            trackView = masterTrackView(track);
            break;
        case "Performance":
            trackView = performanceTrackView(track);
            break;
        // case "Module":
        //     trackView = moduleTrackView(track);
        //     break;
        // case "Lights":
        //     trackView = lightsTrackView(track);
        //     break;
        // case "Motion":
        //     trackView = motionTrackView(track);
        //     break;
        default:
            break;
    }
    return trackView;
}


function FxTrackView(props){
    return (
        getTrackView(props.track)
    );
}

export default FxTrackView;