signalk-custom-can-parser

Allows users to parse can data that are not directly supported by SignalK.
Currently it reads the current of a CAB500 sensor at adress 0x6A6, 1702, and it will be shown in signalk as Current.value

Getting started

1. Use the SignalK Appstore to install the signalk-custom-can-parser plugin.
2. Browse to Server => Plugin => Custom CAN parser choose which CAN-bus it should listen on, can0, can1 or vcan0 and then enable it.
3. Restart SignalK

If it dosen't start, you get "require("../build/Release/can.node")", it might be due to that socketcan is not isntall properly. If so:

1. cd ~signalk/node_modules/socketcan/
2. npm install socketcan

That builds the application.

Configuration

canInterface can0, can1 etc
