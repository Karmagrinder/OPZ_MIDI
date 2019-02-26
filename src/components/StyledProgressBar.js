import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';


function StyledProgressbar(props) {
    var color = props.color;
    var windowWidth = window.innerWidth;
    //var windowHeight = window.height();
    var sizeRatio = Math.ceil((windowWidth/100)*9.5);
    var divSize = sizeRatio.toString() + "px";
    
    return (
        <div style={{ width:divSize, alignItems:'center', padding:'5px' }}>
                <CircularProgressbar
                    percentage={props.percentage}
                    text={props.text}
                    // Path width must be customized with strokeWidth,
                    // since it informs dimension calculations.
                    strokeWidth={9}
                    // You can override styles either by specifying this "styles" prop,
                    // or by overriding the default CSS here:
                    // https://github.com/iqnivek/react-circular-progressbar/blob/master/src/styles.css
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the part that's "complete"
                        path: {
                            // Tweak path color:
                            stroke: color,
                            // Tweak path to use flat or rounded ends:
                            strokeLinecap: "butt",
                            // Tweak transition animation:
                            //transition: "stroke-dashoffset 0.5s ease 0s"
                        },
                        // Customize the circle behind the path
                        trail: {
                            // Tweak the trail color:
                            stroke: "#767777"
                        },
                        // Customize the text
                        text: {
                            // Tweak text color:
                            fill: "#fff600",
                            // Tweak text size:
                            fontSize: "17px",                            
                        }
                    }}
                />
                                      
        </div>
        
    );
}

export default StyledProgressbar;
