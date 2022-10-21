
![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Krypc_Logo.png/2560px-Krypc_Logo.png)


# KrypC Web3 SDK

## Introduction
This package aims to simplify a developer's experience in building web3 products by providing them with a simple and easy to use suite of tools and methods to accelerate development. 

## Features

- Quick and easy setup
- Ready to use Infrastructure 
- Multiple Protocols Support
- Different suites for development


## Table of Contents
1. [Introduction](#introduction)
2. [Supported Chains](#supported-chains)
3. [Usage](#usage)
4. [Features](#features)
5. [Power Methods](#power-methods)
6. [Testing SDK Methods](#testing-sdk-methods)
7. [Support](#support)
8. [Contributing](#contributing)
9. [License](#license)

## Supported Chains
Currently, the SDK supports the following chains. We are working to add more chains. 
| Chain Name | Chain ID       |
| :-------- | :-------   |
| `Polygon Mainnet` | `137`   |
| `Polygon Mumbai Testnet` | `80001`   |
| `Ethereum Mainnet` | `1`   |
| `Ethereum Goerli Testnet` | `5`   |

## Pre-Requisites
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

| Method  | Input Parameters | Returns     | Usage                |
| :-------- | :------- | :------- | :------------------------- | 
| `getBalance` | Address, ChainID |Balance in Native Token | `Web3Engine.Wallet.getBalance` |
| `getERC20Balance` | User Address, Contract Address, Chain ID  | Balance of ERC-20 tokens | `Web3Engine.Wallet.getERC20Balance` |
| `getCurrentChainId` |  Ethers provider | ChainID | `Web3Engine.Wallet.getCurrentChainId` |
| `getCurrentChainName` |  Ethers provider | Chain Name | `Web3Engine.Wallet.getCurrentChainName` |
| `transferCrypto` | receiver_address, signer, transfer_amount (in wei)| Tx Hash | `Web3Engine.Wallet.transferCrypto` |
| `signMessage` | message, signer | ECDSA signature | `Web3Engine.Wallet.signMessage` |
| `verifySignatureonChain` | message, ECDSA signature, signer Address | boolean | `Web3Engine.Wallet.verifySignature` |
| `verifySignatureOffChain` | message, ECDSA signature, signer Address | boolean | `Web3Engine.Wallet.verifySignature` |
| `switchNetwork` | provider, chainID |  | `Web3Engine.Wallet.switchNetwork` |
| `transferERC20` | receiver_address, signer, Contract Address, transfer_amount (in wei) | Tx Hash | `Web3Engine.Wallet.transferERC20` |

### Storage Suite


| Method  | Input Parameters | Returns     | Usage                |
| :-------- | :------- | :------- | :------------------------- | 
| `uploadtoIPFS` | File| CID Hash | `Web3Engine.Storage.uploadtoIPFS` |
| `getFileFromIPFS` | CID Hash| file content | `Web3Engine.Storage.getFileFromIPFS` |
| `getGatewayLink` | CID Hash | Gateway URL | `Web3Engine.Storage.getGatewayLink` |


### Utils Suite


| Method  | Input Parameters | Returns     | Usage                |
| :-------- | :------- | :------- | :------------------------- | 
| `resolveAddresstoENS` | Address |  ENS Name | `Web3Engine.Utils.resolveAddresstoENS` |
| `resolveENStoAddress` | ENS Name | Address | `Web3Engine.Utils.resolveENStoAddress` |

### NFT Suite


| Method  | Input Parameters | Returns     | Usage                |
| :-------- | :------- | :------- | :------------------------- | 
| `createNftCollection` | signer, collectionName, symbol |  contract address | `Web3Engine.Nft.createNftCollection` |
| `mintNfttoCollection` | signer, contractAddress, nftName, nftDescription, nftContent | Tx Hash | `Web3Engine.Nft.mintNfttoCollection` |








## Support

For support, email or join our Discord channel.


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT](https://choosealicense.com/licenses/mit/)


