import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import TrackTabs from './Tabs';

class InstrumentsTrackHandler extends Component{
    constructor(props, ref){
        super(props, ref);
        this.instrumentTracks = [];
        this.trackNames = ["Kick", "Snare", "HiHat", "Samples", "Bass", "Lead", "Arp", "Chord"];
        this.currentActiveTrack = {};
        this.activeTrackIndex = 0;

        this.parseMessage = this.parseMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.moduleOutput = this.moduleOutput.bind(this);
        this.midiCC = this.midiCC.bind(this);
        this.setActiveTrack = this.setActiveTrack.bind(this);
        this.saveActiveTrack = this.saveActiveTrack.bind(this);
        this.handleLfoShape = this.handleLfoShape.bind(this);
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
            shapeVal:"",
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
            <div>
                <div>
                    <TrackTabs tracks={this.instrumentTracks} activeTrack={this.activeTrackIndex} autoTrigger={true}/>
                </div>
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
        this.activeTrackIndex = trackId;
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
                this.currentActiveTrack.shapeVal = this.convertTo100Range(velocity);
                this.handleLfoShape(this.currentActiveTrack.shapeVal);
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

    handleLfoShape(value){
        if(value === 0){
            this.currentActiveTrack.shape = "Free";
        }
        else if(value === 100){
            this.currentActiveTrack.shape = "Trig";
        }
        else if(value === 50){
            this.currentActiveTrack.shape = "Sqr";
        }
        else if(value>0 && value<50){
            this.currentActiveTrack.shape = "fr-sq"
        }
        else if (value > 50 && value < 100) {
            this.currentActiveTrack.shape = "sq-tr"
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
            // case 144:
            //     trackId = 0;
            //     break;
            // case 145:
            //     trackId = 1;
            //     break;
            // case 146:
            //     trackId = 2;
            //     break;
            // case 147:
            //     trackId = 3;
            //     break;
            // case 148:
            //     trackId = 4;
            //     break;
            // case 149:
            //     trackId = 5;
            //     break;
            // case 150:
            //     trackId = 6;
            //     break;
            // case 151:
            //     trackId = 7;
            //     break;
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