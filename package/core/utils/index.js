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

    async validateAddress(address){
        return this.ethers.utils.isAddress(address)
    }

    getCurrencySymbol(chainIdVal) {
        // check if chainId val is a number else throw error
        if (typeof chainIdVal !== "number") {
            throw new Error("Invalid chainId value passed")
        }
        switch(chainIdVal){
            case 1:
                return "ETH";
            case 80001:
                return "MATIC";
            case 137:
                return "MATIC";
            case 56:
                return "BNB";
            case 97:
                return "BNB";
            case 250:
                return "FTM";
            case 43114:
                return "AVAX";
            case 43113:
                return "AVAX";
            case 5:
                return "ETH";
            case 42:
                return "ETH";
            case 3:
                return "ETH";
            case 4:
                return "ETH";
            case 100:
                return "XDAI";
            default:
                return "ETH";
        }
    }

    async deployContract(signer, abi, bytecode, args) {
        try {
            const factory = new this.ethers.ContractFactory(abi, bytecode, signer);
            const contract = await factory.deploy(...args);
            await contract.deployTransaction.wait()
            return contract.address
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async callContractMethod(signer, contract_address, contract_abi, method, args) {
        try {
            const contract = new this.ethers.Contract(contract_address, contract_abi, signer)
            const tx = await contract[method](...args)
            await tx.wait()
            return tx.hash
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async callContractViewMethod(provider, contract_address, contract_abi, method, args) {
        try {
            const contract = new this.ethers.Contract(contract_address, contract_abi, provider)
            const result = await contract[method](...args)
            return result
        }
        catch(err) {
            throw new Error(err)
        }
    }

}

module.exports = Utils