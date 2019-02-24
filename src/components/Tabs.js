import React,{Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import InstrumentTrack from './InstrumentTrack';


class TrackTabs extends Component{
    constructor(props, ref){
        super(props,ref);
        this.state = { tabIndex:0 };
        this.activeTabIndex = 0;
        
        this.renderOutput = this.renderOutput.bind(this);
        this.updateTheActiveTab = this.updateTheActiveTab.bind(this);
    };

    updateTheActiveTab(index){
        this.activeTabIndex = index;
        this.setState({ tabIndex: index}); // just setting the state so that it resluts in the whole component reload
    }



    renderOutput(allTracks){
        var tabList = allTracks.map((track) =>
            <Tab key={track.trackName + 'Tab'}>{track.trackName}</Tab>
        );

        var tabPanels = allTracks.map((track) =>
            <TabPanel key={track.trackName + 'Panel'} ><InstrumentTrack track={track} /></TabPanel>
        );
        //activeTabIndex = props.activeTrack;

        return (
            <div>
                <Tabs selectedIndex={this.activeTabIndex} onSelect={tabIndex => this.updateTheActiveTab(tabIndex)}>
                    <TabList>
                        {tabList}
                    </TabList>
                    {tabPanels}
                </Tabs>
            </div>
        );
    }
    


    render(props) {
        this.activeTrack = this.props.activeTrack;
        return(
          <div>{this.renderOutput(this.props.tracks)}</div>  
        );
}

}



export default TrackTabs;