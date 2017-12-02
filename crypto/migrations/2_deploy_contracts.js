var Game = artifacts.require("./SatoshisDilemna.sol")

module.exports = (deployer) => {
  deployer.deploy(Game)
}
