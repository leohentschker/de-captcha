var DeCAPTCHA = artifacts.require("./DeCAPTCHA.sol");

module.exports = (deployer) => {
  deployer.deploy(DeCAPTCHA)
}
