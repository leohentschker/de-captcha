// Required for the remote-hosted infura node
var bip39 = require("bip39")
var hdkey = require('ethereumjs-wallet/hdkey')
var ProviderEngine = require("web3-provider-engine")
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js')
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js")
var Web3 = require("web3")
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')

// Get our mnemonic and create an hdwallet
var mnemonic = "crouch entry silent cover casual fancy emerge they drip cinnamon inherit assault"
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/"
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet()
var testAddress = "0x" + wallet.getAddress().toString("hex")

var providerUrl = "https://testnet.infura.io"
var testEngine = new ProviderEngine()
// filters
testEngine.addProvider(new FilterSubprovider())

testEngine.addProvider(new WalletSubprovider(wallet, {}))
testEngine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
testEngine.start() // Required by the provider engine.

module.exports.testEngine = testEngine
module.exports.testAddress = testAddress
