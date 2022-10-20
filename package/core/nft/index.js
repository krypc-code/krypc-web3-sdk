const MainInitializer = require("../main")
const StorageEngineClass = require("../storage")
const base = require("../../base")
const abis = base.abis
const bytecodes = base.bytecodes

class Nft extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
    }
    
    async createNftCollection(signer, collectionName, symbol) {
        const factory = new this.ethers.ContractFactory(abis.nftMinterAbi, bytecodes.nftMinterBytecode, signer)
        const contract = await factory.deploy(collectionName, symbol)
        await contract.deployTransaction.wait()
        return contract.address
    }

    async mintNfttoCollection(signer, contractAddress, nftName, nftDescription, nftContent) {
        // nftContent here is the data that wants to be made as an NFT
        var StorageEngine = new StorageEngineClass(this.apiKey)
        const nftContentCid = await StorageEngine.uploadtoIPFS(nftContent)
        const nftContentUri = await StorageEngine.getGatewayLink(nftContentCid)
        const nft_metadata = {
            nftName, 
            nftDescription, 
            image: nftContentUri
        }
        // console.log(nft_metadata)
        const nftMetadataCid = await StorageEngine.uploadtoIPFS(JSON.stringify(nft_metadata))
        const nftMetadataUri = await StorageEngine.getGatewayLink(nftMetadataCid)
        const contract = new this.ethers.Contract(contractAddress, abis.nftMinterAbi, signer)
        const minterAddress = await signer.getAddress()
        const tx = await contract.mintNFT(minterAddress, nftMetadataUri)
        await tx.wait()
        return tx.hash
    }



}

module.exports = Nft