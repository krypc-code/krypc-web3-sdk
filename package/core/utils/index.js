const MainInitializer = require("../main")
const base = require("../../base")
const getWalletConfigs = base.walletConfigs

class Utils extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
    }

    async resolveAddresstoENS(address) {
        // check if address is valid
        var isValidAddress =  this.ethers.utils.isAddress(address)
        if (!isValidAddress) {
            throw new Error("Invalid Address Input")
        }
        const ensReverseLookupProvider = new this.ethers.providers.JsonRpcProvider(this.ETHEREUM_MAINNET_URL);
        const resolvedDomain = await ensReverseLookupProvider.lookupAddress(address);
        if(!resolvedDomain){
            return
        }
        return resolvedDomain
    }


    async resolveENStoAddress(ensDomain) {
        if(!ensDomain.endsWith(".eth")){
            throw new Error("Invalid Input: Not ENS Domain") 
        }
        const provider = new this.ethers.providers.JsonRpcProvider(this.ETHEREUM_MAINNET_URL);
        const resolvedAddress = await provider.resolveName(ensDomain);
        if(!resolvedAddress){
            console.error("❌ Invalid ENS Domain")
            return 
        }
        return resolvedAddress
    }

    async connectWallet(options) {
        const providerOptions = await getWalletConfigs(options)
        console.log(providerOptions)
        const Web3Modal = this.web3Modal
        const web3Modal = new Web3Modal({
            theme: "dark",
            network: "mainnet", // optional
            // cacheProvider: true, // optional
            providerOptions: providerOptions // required
        });  
        const connection = await web3Modal.connect()
        const provider = new this.ethers.providers.Web3Provider(connection, "any")
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        return [provider, signer, address]
    }

}

module.exports = Utils