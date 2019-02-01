import React, {Component} from 'react';

class NoteToKeyConverter extends Component{
    constructor(){
        super();
        this.baseNotes = {
            'C': 24,
            'D': 26,
            'E': 28,
            'F': 29,
            'G': 31,
            'A': 33,
            'B': 35
        };

        this.keys = {};
        this.getKey = this.getKey.bind(this);
    };

    componentWillMount(){
        for(var octave = -2; octave <= 8; ++octave){
            for(var k in this.baseNotes){
                var key = this.baseNotes[k] + (octave*12);
                this.keys[k + 'b' + octave] = key - 1;
                this.keys[k + octave] = key;
                this.keys[k + '#' + octave] = key + 1;
            }
        }
    }

    getKey(note){
        return this.keys[note];
    }

}

export default NoteToKeyConverter;