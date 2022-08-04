const RushNft = artifacts.require("RushNft");
const RushMarketplace = artifacts.require("RushMarketplace");


module.exports = async function (deployer) {
  await deployer.deploy(RushNft);
  const rushNft = await RushNft.deployed();


  await deployer.deploy(RushMarketplace, rushNft.address);


};
