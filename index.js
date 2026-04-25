const parser = require("./parser/index.js");
const { getMsgID, parseFrame } = require("./src/converter");

const PLUGIN_ID = 'signalk-custom-can-parser'
const PLUGIN_NAME = 'Custom CAN Parser'

var can = require("socketcan");
let channel;
//create channel on given can port (vcan0 as test) normally can0/can1

module.exports = function(app) {
    var plugin = {};

    plugin.id = PLUGIN_ID;
    plugin.name = PLUGIN_NAME;
    plugin.description = 'Allows users to parse can data that are not directly supported by SignalK.';

    plugin.start = function (options, restartPlugin) {

    app.debug("Plugin started");
    var channel = can.createRawChannel(options.canInterface, true);

    //create mask on can port to receive only 2 requried CANID's
    //as listed in DBC file
    // 0x6A6 => 06 A6
    // 0x6A7 => 06 A7

        channel.setRxFilters([
            { id: 0x6a6, mask: 0xfff, invert: false },
            { id: 0x6a7, mask: 0xfff, invert: false },
        ]);

        channel.addListener("onMessage", function (msg) {
            msgId = getMsgID(msg.id);
            canData = msg.data.readBigUInt64BE();
            console.log(canData);
            //
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
                console.log(parsedData);
            }
        });

        channel.start();
    };

    plugin.stop = function () {
        if (channel) {
            channel.stop();
        }
        channel = undefined;

        // Here we put logic we need when the plugin stops
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
            // The plugin schema
        },
    };

    return plugin
}