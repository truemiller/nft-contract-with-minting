# NFT Contract with Minting and Metadata

- Simple NFT contract.
- Supports minting multiple tokens and addition of metadata for images. 
- Bunch of tests to ensure the contract works as expected.
- Based on the ERC721 standard.
- Extends OpenZeppelin ERC721 contract.
- Uses Hardhat for testing and deployment.
- Works on any EVM chain, just setup Hardhat config appropriately.

## Making Changes

- Make changes to the contract in `contracts/Dogs.sol`.
- Parameters are defined in the constructor.

## Installation
    
```bash
yarn install
```

## Deployment

```bash
npx hardhat run scripts/deploy.js --network ethereum
```

## Testing

```bash
npx hardhat test
```

## Notes

- Don't forget to add your keys to .env
- Don't prefix private key with `0x`
- You'll need to host NFT metadata somewhere. Simple web server will do. Or IPFS.
- You can use the `mint` function to mint tokens.
- Payments accrue in the contract.
- Withdraw payments using the `withdraw` function.
- Only the deployer of the contract can withdraw payments.

Enjoy!
