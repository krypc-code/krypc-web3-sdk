const MainInitializer = require("../main")

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

}

module.exports = Utils