const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  const Dogs = await hre.ethers.getContractFactory('Dogs')
  const dogs = await Dogs.deploy()

  await dogs.deployed()
  console.log('Deployed Dogs: ', dogs.address) // Address of the deployed contract


  // Set the base token URI
  await dogs.functions
    .setBaseTokenUri('https://some-website.com/json/dogs/') // token ID appended to this URL, i.e. https://some-website.com/json/dogs/1
    .then(async (r) => await r.wait())

  // Enable public minting
  await dogs.functions
    .setIsPublicMintEnabled(true)
    .then(async (r) => await r.wait())

  // Mint the first dog
  await dogs.functions
    .mint(1, { value: ethers.utils.parseEther('0.01') })
    .then(async (r) => await r.wait())

  // Disable public minting
  await dogs.functions
    .setIsPublicMintEnabled(false)
    .then(async (r) => await r.wait())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
