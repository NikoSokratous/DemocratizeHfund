const PythagorasProject = artifacts.require("PythagorasProject");


module.exports = async function(deployer) {
  deployer.deploy(PythagorasProject)

  //assign dBank contract into variable to get it's address
  const pythagorasProject = await PythagorasProject.deployed()

};