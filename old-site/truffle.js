require('regenerator-runtime/runtime')

// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// const testNetwork = require('./engines/testEngine.js')

module.exports = {
  networks: {
    // "ropsten": {
    //   network_id: 3,
    //   provider: testNetwork.testEngine,
    //   from: testNetwork.testAddress,
    // },
    "test": {
      network_id: 2,
      host: 'localhost',
      port: 8546,
    },
    "local": {
      network_id: 1,
      host: 'localhost',
      port: 8545,
    }
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
}
