<p align="center">
    <br />
    <a href="https://krypc.com">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Krypc_Logo.png/2560px-Krypc_Logo.png" width="300" alt=""/></a>
    <br />
</p>

<h1 align="center"><a href='http://krypc.com/'>KrypC</a> Web3 JavaScript SDK</h1>

<p align="center"><strong>Your Gateway to Unlock Web3</strong></p>


## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Supported Chains](#supported-chains)
4. [Prerequisites](#prerequisites)
5. [Usage](#usage)
6. [Suites](#suites)
7. [Support](#support)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction
This package aims to simplify a developer's experience in building web3 products by providing them with a simple and easy to use suite of tools and methods to accelerate development. 

## Features

- Quick and easy setup
- Ready to use Infrastructure 
- Multiple Protocols Support
- Different suites for development


## Supported Chains
Currently, the SDK supports the following chains. We are working to add more chains. 
| Chain Name | Chain ID       |
| :-------- | :-------   |
| `Polygon Mainnet` | `137`   |
| `Polygon Mumbai Testnet` | `80001`   |
| `Ethereum Mainnet` | `1`   |
| `Ethereum Goerli Testnet` | `5`   |

## Prerequisites
The usage of the SDK requires an API key which can be obtained through the KrypC portal after reegistration. 
## Usage
Install the package from npm registry using the following command:


```javascript
npm i @krypc/web3-sdk
```

Once installed, you can use it by following the steps below:
```javascript
// Import the krypc web3 SDK
const sdk = require("@krypc/web3-sdk")

// Initialize the web3 Engine with your API key
const Web3Engine = new sdk.Web3Engine(<API_KEY>)


```

Once the Web3Engine is initialized with the API key, you can use all the features of the SDK. 




## Suites

The SDK offers various methods based on the various suites supported by the SDK. Suites are meant to simplify usage and provide you methods based on particular categories. 

### Current SDK suites have been listed below. 
- Wallet Suite
- Storage Suite
- NFT Suite
- Utils Suite 
- Marketplace Suite

All of the methods available will be described in the below sections. 


### Wallet Suite 

| Method Usage | Input Parameters | Returns     | Description                |
| :-------- | :------- | :------- | :------------------------- | 
| `Web3Engine.Wallet.getBalance` | Address, ChainID | Native token balance in Wei | Get native token balance across supported chains |
| `Web3Engine.Wallet.transfer` | receiver_address, signer, transfer_amount (in wei)| Tx Hash | Transfer native token to any address across our supported chains |
| `Web3Engine.Wallet.getERC20Balance` | User Address, Contract Address, Chain ID  | Balance of ERC-20 tokens | Get any ERC-20 token balance across our supported chains |
| `Web3Engine.Wallet.transferERC20` | receiver_address, signer, Contract Address, transfer_amount (in wei) | Tx Hash | Transfer ERC-20 tokens across our supported chains |
| `Web3Engine.Wallet.signMessage` | message, signer | ECDSA signature | Generate ECDSA signature of a message from wallet |
| `Web3Engine.Wallet.verifySignatureonChain` | message, ECDSA signature, signer Address | boolean | Verify signature on-chain through a deployed smart contract (gasless) |
| `Web3Engine.Wallet.verifySignatureOffChain` | message, ECDSA signature, signer Address | boolean | Verify signature off-chain  |
| `Web3Engine.Wallet.getCurrentChainId` |  Ethers provider | ChainID | Get chain ID of currently connected network |
| `Web3Engine.Wallet.getCurrentChainName` |  Ethers provider | Chain Name | Get chain name of currently connected network |
| `Web3Engine.Wallet.switchNetwork` | provider, chainID | status | Switch network  |


### Storage Suite


| Method Usage  | Input Parameters | Returns     | Description                |
| :-------- | :------- | :------- | :------------------------- | 
| `Web3Engine.Storage.uploadtoIPFS` | File| CID Hash | Upload any file to IPFS and get the CID associated with it.  |
| `Web3Engine.Storage.getFileFromIPFS` | CID Hash| file content | Retrieve a file from IPFS using the CID |
| `Web3Engine.Storage.getGatewayLink` | CID Hash | Gateway URL | Get the IPFS URL of the file using CID |


### Utils Suite


| Method Usage  | Input Parameters | Returns     | Description                |
| :-------- | :------- | :------- | :------------------------- | 
| `Web3Engine.Utils.resolveAddresstoENS` | Address |  ENS Name | Returns ENS Domain associated with address |
| `Web3Engine.Utils.resolveENStoAddress` | ENS Name | Address | Returns address associated with an ENS Domain |

### NFT Suite


| Method Usage  | Input Parameters | Returns     | Description                |
| :-------- | :------- | :------- | :------------------------- | 
| `Web3Engine.Nft.createNftCollection` | signer, collectionName, symbol |  contract address | Create an NFT collection across our supported chains |
| `Web3Engine.Nft.mintNfttoCollection` | signer, contractAddress, nftName, nftDescription, nftContent | Tx Hash | Mint a NFT to your collection across our supported chains |








## Support

For support, email or join our Discord channel.


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)


