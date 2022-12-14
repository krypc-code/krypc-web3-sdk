require('dotenv').config()
const {convertToArt} = require("./assets/sampleart")
const fs = require('fs');


// using the SDK
const sdk = require("@krypc/web3-sdk")
const Web3Engine = new sdk.Web3Engine(process.env.KRYPCORE_W3_API_KEY)

// getting wrapped package
const ethers = Web3Engine.ethers
const hethers = Web3Engine.hethers


// creating some test providers & signers
const testProvider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")
const testSigner = new ethers.Wallet(process.env.PRIVATE_KEY_FOR_TESTING, testProvider);
const testProviderforCryptoSend = new ethers.providers.JsonRpcProvider(Web3Engine.POLYGON_MUMBAI_URL)
const testSignerforCryptoSend = new ethers.Wallet(process.env.PRIVATE_KEY_FOR_TESTING, testProviderforCryptoSend);

async function RunWalletMethods() {
    // Get Balance Using Address and Chain ID
    const myBalance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", 80001)
    console.log("✅ Your balance fetched from a power method is ",myBalance, " MATIC")

    
    // Sign Meessage
    const signature = await Web3Engine.Wallet.signMessage("Hello World", testSigner)
    console.log("✅ Signed message using private key via power method: ", signature)

    // Verify Signature On-Chain
    const isVerified_onChain = await Web3Engine.Wallet.verifySignatureonChain("Hello World", "0x18fd6867092d58b68214e7e22cd4def8e1307f3fd1ccd9acfda4feb9b53c7d4c16a9f3380d3ab34d7477d88187c0d46c3e19b45590a3b4b1535c0270bf1276381b", "0xA31Eb71DEA1cac735D474495e6b08eAa807bD4bB")
    console.log("✅ Signature verification status via power method: ", isVerified_onChain)


    // Verify Signature Off-Chain
    const isVerified_offChain = await Web3Engine.Wallet.verifySignatureOffChain("Hello World", "0x18fd6867092d58b68214e7e22cd4def8e1307f3fd1ccd9acfda4feb9b53c7d4c16a9f3380d3ab34d7477d88187c0d46c3e19b45590a3b4b1535c0270bf1276381b", "0xB31Eb71DEA1cac735D474495e6b08eAa807bD4bB")
    console.log("✅ Off-chain Signature verification status via power method: ", isVerified_offChain)


    // Get ERC-20 balance of KRYPC Token
    const myAddress = await testSignerforCryptoSend.getAddress()
    const erc20balance = await Web3Engine.Wallet.getERC20Balance(myAddress, "0x0A0B4062251D0b4827EA70aF320487ce4962F74B", 80001)
    console.log("✅ Your KRYPC Token balance fetched from a power method is ",erc20balance, " KRYPC")

    // Transfer Crypto
    const txhash = await Web3Engine.Wallet.transfer("0x90DD14cD9ce555b3059c388c7791e973BE16fbf5",testSignerforCryptoSend,"100000000000000") // 0.0001 MATIC (specified in Wei)
    console.log("✅ Transaction hash of crypto transfer via power method: ", txhash)


    // Switch Network
    const switchNetwork = await Web3Engine.Wallet.switchNetwork(testProviderforCryptoSend,  80001)
    console.log("✅ Switched network via power method")

    
    // Transfer ERC-20
    const transferERC20 = await Web3Engine.Wallet.transferERC20("0x90DD14cD9ce555b3059c388c7791e973BE16fbf5", testSignerforCryptoSend, "0x0A0B4062251D0b4827EA70aF320487ce4962F74B", "4000000000000000000") // 4 KRYPC (specified in Wei)
    console.log("✅ Transaction hash of ERC-20 transfer via power method: ", transferERC20)

    // Get connected chain name
    const chainName = await Web3Engine.Wallet.getCurrentChainName(testProvider)
    console.log("✅ Currently connected chain name : ", chainName)

    // Get connected chain ID
    const chainId = await Web3Engine.Wallet.getCurrentChainId(testProvider)
    console.log("✅ Currently connected chain name : ", chainId)


}

async function RunStorageMethods() {

    // Upload file on IPFS
    const sampleFile = {
        "name": "Bharath",
        "why": "testing-ipfs"
    }
    const cid = await Web3Engine.Storage.uploadtoIPFS(JSON.stringify(sampleFile))
    console.log("✅ CID of added file in IPFS via power method: ", cid)

    // Fetch file from IPFS
    const file = await Web3Engine.Storage.getFileFromIPFS("QmUkXx2Fg9SBNp8WS5fD3YBULZP9gSWsdgUefX5BxhPi4H")
    console.log("✅ File fetched from IPFS via power method: ", file)

}


async function RunUtilsMethods() {

    // Resolve address to ENS Name
    const myDomain = await Web3Engine.Utils.resolveAddresstoENS("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    console.log("✅ Your ENS domain fetched from a power method is ",myDomain)

    // Resolve ENS Domain to Address
    const myAddress = await Web3Engine.Utils.resolveENStoAddress("7sigma.eth")
    console.log("✅ Your address resolved from ENS using a power method is ",myAddress)

}


async function RunNftMethods() {
    
    // create a nft collection
    const nftCollection_deployedAddress = await Web3Engine.Nft.createNftCollection(testSignerforCryptoSend, "KrypC Collection", "KRYPNFT")
    console.log("✅ Your NFT Collection (ERC-721 contract) has been deployed at ",nftCollection_deployedAddress)

    // minting 10 nft editions
    for(var i = 1; i<=5; i++) {
        var edition_image = await convertToArt(i)
        const mintTxHash = await Web3Engine.Nft.mintNfttoCollection(testSignerforCryptoSend, nftCollection_deployedAddress ,"KrypC Editions", "This is a limited edition KrypC NFT", edition_image)
        console.log( `✅ Just minted KrypC NFT edition ${i} with txhash ${mintTxHash}`)
    }

    // transferring an NFT to 7sigma
    const resolvedAddress = await Web3Engine.Utils.resolveENStoAddress("7sigma.eth")
    const transferTxHash = await Web3Engine.Nft.transferNft(testSignerforCryptoSend, nftCollection_deployedAddress, 1, resolvedAddress)
    console.log( `✅ Just transferred your NFT with token ID 1 to ${resolvedAddress} with txhash ${transferTxHash}`)
    
    // minting a nft to a collection
    // var image_data;
    // try {
    //     image_data = fs.readFileSync('./assets/krypc.jpeg');
    // } 
    // catch (err) {
    //     console.error(err);
    // }

    // const mintTxHash = await Web3Engine.Nft.mintNfttoCollection(testSignerforCryptoSend, "0xf86575D567c87C98c493B7c67222934F16d14cAF" ,"KrypC Logo NFT", "This is a NFT of the KrypC logo", image_data)
    // console.log("✅ Your NFT has been minted successfully - txHash:",mintTxHash)


}


async function RunNftStuffviaUtils() {

    const nftMinterAbi = require("./test-contract-artifacts/abi/erc721")
    const nftMinterBytecode = require("./test-contract-artifacts/bytecode/erc721")
    const deployedContractAddress = await Web3Engine.Utils.deployContract(testSignerforCryptoSend, nftMinterAbi, nftMinterBytecode, ["KrypC Collection", "KRYPNFT"])
    console.log("✅ Your NFT Collection (ERC-721 contract) has been deployed at ",deployedContractAddress)
    const sampleAddress = await Web3Engine.Utils.resolveENStoAddress("7sigma.eth")
    console.log("NFT Mint to address ", sampleAddress)
    const mintTxHash = await Web3Engine.Utils.callContractMethod(testSignerforCryptoSend, deployedContractAddress, nftMinterAbi, "mintNFT", [sampleAddress, "https://web3-proxy.krypcore.com/ipfsGateway/aje29azxmsi3sw0/ipfs/Qmcuu6xxqyg98LWq1C97WqVEprQTbU6YPupAQg2SNigt7j"])
    console.log("✅ Your NFT has been minted successfully - txHash:",mintTxHash)

}

async function TestHederaMethods() {

    const testHederaProvider =  new ethers.providers.JsonRpcProvider(Web3Engine.HEDERA_TESTNET_URL)
    const testHederaSigner = new ethers.Wallet(process.env.HEDERA_TESTNET_PRIVATE_KEY, testHederaProvider)
    const myBalance = await Web3Engine.Wallet.getBalance("0x6bfC7F8e230d5725a7E55bD06CD4406c3B0A067F", 296)
    console.log("✅ Your HBAR balance fetched from a power method is ",myBalance, " HBAR")


    const signature = await Web3Engine.Wallet.signMessage("Hello World", testHederaSigner)
    console.log("✅ Signed message using private key via power method: ", signature)


     // Verify Signature On-Chain
     const isVerified_onChain = await Web3Engine.Wallet.verifySignatureonChain("Hello World", "0x92aee600de0411051d0d6b15ef553d9ef0aee4b23b5c958491be60377f441be2520c2bc7adbe7bd95c7bc85a404a181bd95ad11c7df8354f33c4f76fad038c6e1b", "0x6bfC7F8e230d5725a7E55bD06CD4406c3B0A067F")
     console.log("✅ Signature verification status via power method: ", isVerified_onChain)
 
 
     // Verify Signature Off-Chain
     const isVerified_offChain = await Web3Engine.Wallet.verifySignatureOffChain("Hello World", "0x92aee600de0411051d0d6b15ef553d9ef0aee4b23b5c958491be60377f441be2520c2bc7adbe7bd95c7bc85a404a181bd95ad11c7df8354f33c4f76fad038c6e1b", "0x6bfC7F8e230d5725a7E55bD06CD4406c3B0A067F")
     console.log("✅ Off-chain Signature verification status via power method: ", isVerified_offChain)


    // Get ERC-20 balance of KRYPC Token
    const myAddress = await testHederaSigner.getAddress()
    const erc20balance = await Web3Engine.Wallet.getERC20Balance(myAddress, "0x0000000000000000000000000000000002EA9676", 296)
    console.log("✅ Your KRYPC Token balance fetched from a power method is ",erc20balance, " KRYPC")

    const txhash = await Web3Engine.Wallet.transfer("0x6465Ace657536236547F629AAA239588e95Ac843",testHederaSigner,"1000000000000000000") // 0.1 HBAR (specified in Wei)
    console.log("✅ Transaction hash of HBAR transfer (1 HBAR) via power method: ", txhash)
    const NewmyBalance = await Web3Engine.Wallet.getBalance("0x6bfC7F8e230d5725a7E55bD06CD4406c3B0A067F", 296)
    console.log("✅ Your new HBAR balance after transfer fetched from a power method is ",NewmyBalance, " HBAR")

    const transferERC20 = await Web3Engine.Wallet.transferERC20("0x6465Ace657536236547F629AAA239588e95Ac843", testHederaSigner, "0x0000000000000000000000000000000002EA9676", "4000000000000000000") // 4 KRYPC (specified in Wei)
    console.log("✅ Transaction hash of ERC-20 transfer (4 KRYP Tokens) via power method: ", transferERC20)
    const Newerc20balance = await Web3Engine.Wallet.getERC20Balance(myAddress, "0x0000000000000000000000000000000002EA9676", 296)
    console.log("✅ Your new KRYPC Token balance after transfer fetched from a power method is ",Newerc20balance, " KRYPC")



}


async function TestSDK() {
    
    // console.log("************ TESTING WALLET METHODS **********************")
    // console.log()
    // await RunWalletMethods()
    // console.log()

    // console.log("************ TESTING STORAGE METHODS **********************")
    // console.log()
    // await RunStorageMethods()
    // console.log()

    // console.log("************ TESTING UTILS METHODS **********************")
    // console.log()
    // await RunUtilsMethods()
    // console.log()

    // console.log("************ TESTING NFT METHODS **********************")
    // console.log()
    // await RunNftMethods()
    // console.log()


    // console.log("************ TESTING NFT METHODS VIA UTILS **********************")
    // console.log()
    // await RunNftStuffviaUtils()
    // console.log()

    console.log("************ TESTING HEDERA SPECIFIC METHODS **********************")
    console.log()
    await TestHederaMethods()
    console.log()


    // ************* Uploading an image to IPFS and printing the URL ************************
    // const image = fs.readFileSync("./access_token_nft.png")
    // const cid = await Web3Engine.Storage.uploadtoIPFS(image)
    // const url = await Web3Engine.Storage.getGatewayLink(cid)
    // console.log(url)

    // var nft_metadata = {
    //     "name": "KrypC Editions Unlock Web3 NFT Access Token",
    //     "description": "This is a limited edition KrypC NFT (only 100 quantity) that provides exclusive perks to the holder !",
    //     "image": "https://web3-proxy.krypcore.com/ipfsGateway/aje29azxmsi3sw0/ipfs/Qmcuu6xxqyg98LWq1C97WqVEprQTbU6YPupAQg2SNigt7j",
    // }

    // const metadata_cid = await Web3Engine.Storage.uploadtoIPFS(JSON.stringify(nft_metadata))
    // const metadata_url = await Web3Engine.Storage.getGatewayLink(metadata_cid)
    // console.log(metadata_url)





}


TestSDK()