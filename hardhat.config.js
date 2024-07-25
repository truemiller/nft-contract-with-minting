require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
const dotenv = require('dotenv')

dotenv.config()

task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ethereum: {
      url: process.env.RPC_ETH,
      accounts: [process.env.PRIVATE_KEY_ETH],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
