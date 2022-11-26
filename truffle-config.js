const HDWalletProvider = require("@truffle/hdwallet-provider");

// Be sure to match this mnemonic with that in Ganache!
var mnemonic =
    "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
    networks: {
        develop: {
            provider: function () {
                return new HDWalletProvider(
                    mnemonic,
                    "http://127.0.0.1:8545/",
                    0,
                    10
                );
            },
            network_id: "*",
            gas: 9999999,
        },
    },
    compilers: {
        solc: {
            version: "^0.8.16", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {
                // See the solidity docs for advice about optimization and evmVersion
                viaIR: true,
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                //  evmVersion: "byzantium"
            },
        },
    },
};
