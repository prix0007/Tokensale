const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

// Don't use in production. Ganache Mnemonics
const Mnemonic = "photo protect core half gospel grace among car nation mutual panel uponnote";
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: 5777,
      port: 7545,
      host: "127.0.0.1"
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(Mnemonic, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(Mnemonic, process.env.INFURA_NODE, AccountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
