signalk-custom-can-parser
Allows users to parse can data that are not directly supported by SignalK.

Getting started
1.) Use the SignalK Appstore to install the signalk-custom-can-parser plugin.
2.) Browse to Server => Plugin => Custom CAN parser and enable it.
3.) Restart SignalK

Configuration - Basic
At the basic level all CAN messsage can be interpeded a data point is required to have the adress and the path you want to map it. The path is a template that you can specify any data field value or device instance for use in the path. The field value you want to use in the template should be surrounded by {} brackets.