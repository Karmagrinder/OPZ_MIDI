# OP-Z WebMIDI App
This app reads the MIDI messages sent by OP-Z and displays them. This is helpful if you want to note down the the parameter settings. 
This app will function only on web-browsers that support Web-MIDI. I recomend using latest version of Chrome browser.

## Release notes:
![ReleaseNotes](ReleaseNotes.md)
## Demo
YouTube link: https://youtu.be/kuoQAp6DrUc 

## Setup
App URL:  https://karmagrinder.github.io/OPZ_MIDI/

### Connecting OP-Z
#### Android Phone
`Wired mode:`  Most of the new Android phones support USB-OTG functionality, you can connect OP-Z via the USB-C cable to your Android phone using a USB-OTG adapter. This method is helpful if you want to save battery on your OP-Z, for example live-gig situation. 

`Via Bluetooth:` There are quite few Bluetooth-MIDI connectivity apps available on Google-Play app-store. I used this app: https://play.google.com/store/apps/details?id=bluetooth.midi.connect 
Use one of the Bluetooth-MIDI Conectivity apps and pair with OP-Z. 

#### PC/MAC
Use either Bluetooth-MIDI or USB-C cable to connect OP-Z to the computer. 

## App usage
Launch the app from the URL mentioned earlier. Make sure OP-Z is connected to your phone/computer as a MIDI device.
The app will display parameters when you turn the dials/knobs on your OP-Z. 

## Limitations
1) This app only reacts to the MIDI messages sent by OP-Z, and therefore will be able to display information only when OP-Z send's the data. 
2) Currently the app displays parameters for instrument tracks only.
3) You have to touch/move the dials in order to display parameters for the 1st time. After that the track information is saved in memory. I usually just tap on the dials lightly. 


# To run the app on local server
1) Clone the repository.
2) Install node.js
3) npm install
4) npm start

