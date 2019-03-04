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
const purple = "#9e66c1";
const pageIconSize = 35;
const white = "#ffffff"

function InstrumentTrackView(props){
    return (
        <div className="Instrument-tracks-component">
            <Card bg='dark' style={{ color: blue}} >
                <Card bg="dark" text='white'>
                    <Row>
                        <Col><Card.Title><GetIcon iconName="Params" size={pageIconSize} color={white}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.p1} text={`P1:${props.track.p1}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.p2} text={`P2:${props.track.p2}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.filter} text={`Filter:${props.track.filter}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.resonance} text={`Reso:${props.track.resonance}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" text='success'  >
                    <Row>
                        <Col><Card.Title><GetIcon iconName="Envelope1" size={50} color={green} strokeWidth={5}/></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.attack} text={`A:${props.track.attack}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.decay} text={`D:${props.track.decay}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.sustain} text={`S:${props.track.sustain}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.release} text={`R:${props.track.release}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" style={{ color: purple }}>
                    <Row>
                        <Col><Card.Title><GetIcon iconName="SineWave" size={pageIconSize} color={purple} /></Card.Title></Col>
                        <Col><StyledProgressbar percentage={props.track.depth} text={`Depth:${props.track.depth}`} color={green} /></Col>
                        <Col><StyledProgressbar percentage={props.track.rate} text={`Rate:${props.track.rate}`} color={blue} /></Col>
                        <Col><StyledProgressbar percentage={props.track.dest} text={`Target:${props.track.dest}`} color={yellow} /></Col>
                        <Col><StyledProgressbar percentage={props.track.shapeVal} text={`${props.track.shape}`} color={red} /></Col>
                    </Row>
                </Card>
                <Card bg="dark" style={{ color: yellow }}>
                    <Row>
                        <Col><Card.Title><GetIcon iconName="Master1" size={pageIconSize} color={yellow} /></Card.Title></Col>
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

export default InstrumentTrackView;