import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './InstrumentsTrackHandler.css';
import TrackTabs from './Tabs';

class FxTrackHandler extends Component{
    constructor(props, ref){
        super(props, ref);
        this.instrumentTracks = [];
        this.trackNames = ["Fx1", "Fx2"];
        this.currentActiveTrack = {};
        this.activeTrackIndex = 0;
        this.timingVals = ["1:128", "1:6", "1:96", "2:16", "1:64", "3:16", "1:48", "1:32", 
            "4:16", "1:24", "5:16", "1:12", "1:6", "6:16", "1:3", "7:16", "1:2", "8:16",
            "1:1", "2:1", "9:16", "3:1", "10:16", "4:1"];

        this.parseMessage = this.parseMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.moduleOutput = this.moduleOutput.bind(this);
        this.midiCC = this.midiCC.bind(this);
        this.setActiveTrack = this.setActiveTrack.bind(this);
        this.saveActiveTrack = this.saveActiveTrack.bind(this);
        this.handleTimingKey = this.handleTimingKey.bind(this);
    };

    

    componentWillMount() {
        var trackTemplate = {
            trackName: "",
            p1: "",
            p2: "",
            filter: "",
            resonance: "",
            timing: ""            
        }

        var i;
        for (i = 0; i <=1; i++) {
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
        if ((command === 184) && (command === 185)){
            this.midiCC(note, velocity);
        }
        if ((command === 152) && (command === 153)) {
            this.handleTimingKey(note);
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

    handleTimingKey(note){
        var keyIndex = note - 53;
        if(keyIndex < 0){
            keyIndex = 0;
        }
        if (keyIndex > 23) {
            keyIndex = 23;
        }        
        this.currentActiveTrack.timing = this.timingVals[keyIndex];
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

export default FxTrackHandler;