module.exports = (app) => {
  const plugin = {
    id: 'my-signalk-plugin',
    name: 'My Great Plugin',
    start: (settings, restartPlugin) => {
      // start up code goes here.
    },
    stop: () => {
      // shutdown code goes here.
    },
    schema: () => {
      properties: {
        // plugin configuration goes here
      }
    }
  }

  return plugin
}