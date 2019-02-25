import React from 'react';
import { MdAudiotrack } from 'react-icons/md';
import { IoMdMusicalNotes } from 'react-icons/io';
import { GiPeach, GiDrum, GiFrisbee, GiSoundWaves } from 'react-icons/gi';
import { GoBold, GoKebabHorizontal } from 'react-icons/go';

function GetIcon(props) {
    var icon = "";
    switch (props.itemName) {
        case "Kick":
            icon = <div>
                <GiPeach size={25} />
                        </div>
            break;
        case "Snare":
            icon = <div>
                <GiDrum size={25} />
                            </div>
            break;
        case "HiHat":
            icon =
                <div>
                    <GiFrisbee size={25} />
                        </div>
            break;
        case "Samples":
            icon = <div>
                <GiSoundWaves size={25} />
                        </div>
            break;
        case "Bass":
            icon = <div>
                <GoBold size={25} />
                        </div>
            break;
        case "Lead":
            icon = <div>
                <MdAudiotrack size={25} />
                        </div>
            break;
        case "Arp":
            icon = <div>
                <GoKebabHorizontal size={25} /> 
                        </div>
            break;
        case "Chord":
            icon = <div>
                <IoMdMusicalNotes size={25} />
                        </div>
            break;
        default:
            break;
    }
    return icon;
}

export default GetIcon;