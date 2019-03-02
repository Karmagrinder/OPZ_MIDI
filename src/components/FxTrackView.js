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
const white = "#ffffff"

function FxTrackView(props){
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
                        <Col><Card.Title>Takt:</Card.Title></Col>
                        <Col>{props.track.timeSignature}</Col>
                    </Row>
                </Card>                
            </Card>
        </div>
    );
}

export default FxTrackView;