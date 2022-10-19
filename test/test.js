require('dotenv').config()

// using the SDK
const sdk = require("krypc-web3-sdk")
const Web3Engine = new sdk.Web3Engine("aje29azxmsi3sw0")

// getting wrapped package
const ethers = Web3Engine.ethers


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
    const erc20balance = await Web3Engine.Wallet.getERC20Balance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", "0x0A0B4062251D0b4827EA70aF320487ce4962F74B", 80001)
    console.log("✅ Your KRYPC Token balance fetched from a power method is ",erc20balance, " KRYPC")

    // Transfer Crypto
    const txhash = await Web3Engine.Wallet.transferCrypto("0x90DD14cD9ce555b3059c388c7791e973BE16fbf5",testSignerforCryptoSend,"100000000000000") // 0.0001 MATIC (specified in Wei)
    console.log("✅ Transaction hash of crypto transfer via power method: ", txhash)


    // Switch Network
    const switchNetwork = await Web3Engine.Wallet.switchNetwork(testProviderforCryptoSend,  80001)
    console.log("✅ Switched network via power method")

    const transferERC20 = await Web3Engine.Wallet.transferERC20("0x90DD14cD9ce555b3059c388c7791e973BE16fbf5", testSignerforCryptoSend, "0x0A0B4062251D0b4827EA70aF320487ce4962F74B", "2000000000000000000") // 2 KRYPC (specified in Wei)
    console.log("✅ Transaction hash of ERC-20 transfer via power method: ", transferERC20)
}

async function RunStorageMethods() {

}


RunWalletMethods()
RunStorageMethods()