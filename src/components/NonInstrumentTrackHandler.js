import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import TrackTabs from './Tabs';

const trackType = "nonInstrument";
const midiCcCommands = [184, 185, 186, 187, 188]
const performanceEffects = ["Duck", "Filter Sweep", "Loop", "Stereo", "Loop1", "Pitch", "Echo",
                            "Fill", "Short", "Fill1", "Long", "Random"]
const blackKeys = [54, 56, 58, 61, 63, 66, 68, 70, 73, 75];
const whiteKeys = [53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76];

class NonInstrumentTrackHandler extends Component{
    constructor(props, ref){
        super(props, ref);
        this.instrumentTracks = [];
        this.trackNames = ["Fx1", "Fx2", "Tape", "Master", "Performance"];
        this.currentActiveTrack = {};
        this.activeTrackIndex = 0;
        this.timeSignatureVals = ["1:128", "1:6", "1:96", "2:16", "1:64", "3:16", "1:48", "1:32", 
            "4:16", "1:24", "5:16", "1:12", "1:6", "6:16", "1:3", "7:16", "1:2", "8:16",
            "1:1", "2:1", "9:16", "3:1", "10:16", "4:1"];

        this.parseMessage = this.parseMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.moduleOutput = this.moduleOutput.bind(this);
        this.midiCC = this.midiCC.bind(this);
        this.setActiveTrack = this.setActiveTrack.bind(this);
        this.saveActiveTrack = this.saveActiveTrack.bind(this);
        this.handleTimeSignatureKey = this.handleTimeSignatureKey.bind(this);
        this.handlePerformanceEffect = this.handlePerformanceEffect.bind(this);
        this.handleTapeBuffeSegments = this.handleTapeBuffeSegments.bind(this);
    };    

    componentWillMount() {
        var trackTemplate = {
            trackName: "",
            p1: "",
            p2: "",
            filter: "",
            resonance: "",
            timeSignature: "" ,
            tapeBufferSegmentLength: 0,
            tapeBufferSegment: 0,
            // masterChordProgression: "",
            performanceEffect: " "
        }

        var i;
        for (i = 0; i <=4; i++) {
            var newTrack = Object.create(trackTemplate);
            this.instrumentTracks.push(newTrack);
            this.instrumentTracks[i].trackName = this.trackNames[i];
        }
    }

    moduleOutput(){
        return (
            <div>
                <div>
                    <TrackTabs type={trackType} tracks={this.instrumentTracks} activeTrack={this.activeTrackIndex} autoTrigger={true}/>
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
        if (midiCcCommands.includes(command)){  // MIDI CC messages
            this.midiCC(note, velocity);
        }
        else if ((command === 152) || (command === 153)) {  // FX Track time signature
            this.handleTimeSignatureKey(note);
        }

        else if (command === 154){
            this.handleTapeBuffeSegments(note);
        }
        // else if (command === 155) {     // Master Track Chord progression
        //     this.handleMasterTrackChordProgression(note);
        // }
        else if (command === 156) {
            this.handlePerformanceEffect(note);
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
            default:
                break;
        }

    }

    handleTimeSignatureKey(note){
        var keyIndex = note - 53;
        if(keyIndex < 0){
            keyIndex = 0;
        }
        if (keyIndex > 23) {
            keyIndex = 23;
        }        
        this.currentActiveTrack.timeSignature = this.timeSignatureVals[keyIndex];
    }

    handlePerformanceEffect(note){
        var index = 0;
        if(note < 113){ //Drum section effects (101 - 112)
            index = note-101;
            if((index<0)||(index>12)){
                index = 0;
            } 
            this.currentActiveTrack.performanceEffect = "Drum section: " + performanceEffects[index];
        }
        else{
            index = note - 113;
            if ((index < 0) || (index > 12)) {
                index = 0;
            }
            this.currentActiveTrack.performanceEffect = "Synth section: " + performanceEffects[index];
        }
    }

    handleTapeBuffeSegments(note){
        if(blackKeys.includes(note)){
            this.currentActiveTrack.tapeBufferSegmentLength = blackKeys.findIndex(x => x === note);
        }
        else{
            this.currentActiveTrack.tapeBufferSegment = whiteKeys.findIndex(x => x === note);
        }
    }

    convertTo100Range(value){
        return  Math.ceil((value*100)/127);
    }

    getTrackId(command) {
        var trackId = 0
        switch (command) {
            case 184:
                trackId = 0;
                break;
            case 185:
                trackId = 1;
                break;
            case 186:
                trackId = 2;
                break;
            case 187:
                trackId = 3;
                break;
            case 188:
                trackId = 4;
                break;

            case 152:
                trackId = 0;
                break;
            case 153:
                trackId = 1;
                break;
            case 154:
                trackId = 2;
                break;
            case 155:
                trackId = 3;
                break;
            case 156:
                trackId = 4;
                break;
            default:
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

export default NonInstrumentTrackHandler;