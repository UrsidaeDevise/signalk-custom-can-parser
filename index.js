const parser = require("./parser/index.js");
const { getMsgID, parseFrame } = require("./src/converter");

//var can = require("socketcan");
//let channel;
//create channel on given can port (vcan0 as test) normally can0/can1

module.exports = function(app) {
    const plugin = {
      id: "signalk-custom-can-parser",
      name: "Custom CAN Parser",
      description: "Allows users to parse can data that are not directly supported by SignalK.",
    };
    
    let channel = null;

    plugin.start = function (options, restartPlugin) {
        let can;
        app.debug("Plugin beginning");
        try {
          can = require("socketcan");
        } catch (err) {
          app.setPluginError(`SocketCAN native module failed to load: ${err.message}`);
          app.error(err);
          return;
        }

        if (!options || !options.canInterface) {
          app.setPluginError("No CAN interface configured");
          return;
        }

        try {
          channel = can.createRawChannel(options.canInterface, true);
        } catch (err) {
          app.setPluginError(`Could not open ${options.canInterface}: ${err.message}`);
          return;
        }
        // create mask on can port to receive only 2 required CANID's
        // as listed in DBC file
        
        channel.setRxFilters([
            { id: 0x6a6, mask: 0xfff, invert: false },
            { id: 0x6a3, mask: 0xfff, invert: false },
            { id: 0x6a0, mask: 0xfff, invert: false },
        ]);

        channel.addListener("onMessage", function (msg) {
            msgId = getMsgID(msg.id);
            canData = msg.data.readBigUInt64BE();
            //console.log(canData);
            

            for (const parserLookup of parser[msgId].data) {
                parsedData = parseFrame(parserLookup, canData);
                app.debug(parsedData);
                app.handleMessage("signalk-custom-can-parser", {
                    updates: [
                        {
                            values: [
                                {
                                    path: parsedData.path,
                                    value: parsedData.value,
                                    
                                },
                            ],
                        },
                    ],
                });
                //console.log(parsedData);
            }
        });

        channel.start();
        app.setPluginStatus(`Listening on ${options.canInterface}`);
        app.debug("Plugin started");
    };

    plugin.stop = function () {
      if (channel) {
        try {
          channel.stop();
        } catch (err) {
          app.error(err);
        }
        channel = null;
      }
      app.debug("Plugin stopped");
    };

    plugin.schema = {
        type: "object",
        required: ["canInterface"],
        properties: {
            canInterface: {
                type: "string",
                title: "Can Interface",
                description: "Name of can Interface can0..can1...",
            },
        },
    };

    return plugin
};
