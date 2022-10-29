const MainInitializer = require("../main")
const base = require("../../base")
const abis = base.abis

class Wallet extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
    }


    async getBalance(address, chainId) {
        // check if address is valid
        var isValidAddress =  this.ethers.utils.isAddress(address)
        if (!isValidAddress) {
            throw new Error("Invalid address passed")
        }
        var rpc_url = this.getRPCURL(chainId)
        var provider =  new this.ethers.providers.JsonRpcProvider(rpc_url)
        const balance = await provider.getBalance(address)
        const balanceinEth = this.ethers.utils.formatEther(balance)
        return balanceinEth
    }


    async signMessage(message, signer){
        var signature;
        try {
            signature = await signer.signMessage(message)
            return signature
        } 
        catch(err) {
            console.error(err)
            return 
        }
    }


    async getERC20Balance(address, contractAddress, chainId) {
        // check if address is valid
        var isValidAddress =  this.ethers.utils.isAddress(address)
        if (!isValidAddress) {
            console.error("❌ Invalid address provided")
            return
        }
        var rpc_url = this.getRPCURL(chainId)
        var provider =  new this.ethers.providers.JsonRpcProvider(rpc_url)
        const erc20Contract = new this.ethers.Contract(contractAddress, abis.erc20Abi, provider);
        const balance = await erc20Contract.balanceOf(address);
        const balanceinEth = this.ethers.utils.formatEther(balance)
        return balanceinEth
    }

    async transfer(receiver_address, signer, transfer_amount) {
        // check if address is valid
        var isValidAddress =  this.ethers.utils.isAddress(receiver_address)
        if (!isValidAddress) {
            console.error("❌ Invalid address provided")
            return false
        }
        var tx
        try{
            tx = await signer.sendTransaction({
                to: receiver_address,
                value: transfer_amount
             })
            await tx.wait()
            return tx.hash
        }

        catch(err){
            console.error(err)
            return false
        }

    }

    async verifySignatureonChain(message, signature, address){
        let verifier_contract_abi = [
            "function verifyString(string, uint8, bytes32, bytes32) public pure returns (address)"
        ];
        const provider = new this.ethers.providers.JsonRpcProvider(this.POLYGON_MUMBAI_URL);
        let contract = new this.ethers.Contract("0x949D1EC16b59749a7d1D886e837AdAf6C9Ab3055", verifier_contract_abi, provider);
        let sig;
        try {
            sig = this.ethers.utils.splitSignature(signature);
        }
        catch (err) {
            console.error(" ❌ Invalid Signature supplied !")
            return
        }
        let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);
        return recovered == address
    }

    async verifySignatureOffChain(message, signature, address) {
        const messageHash = this.ethers.utils.hashMessage(message);
        const messageHashBytes = this.ethers.utils.arrayify(messageHash);
        let recovered = this.ethers.utils.recoverAddress(messageHashBytes, signature);
        console.log(recovered)
        return recovered == address
    }


    async switchNetwork(provider, chainId){
        const network = await provider.getNetwork()
        if(network.chainId == chainId){
            console.log("⚡️ Already on the desired network")
            return true
        }
        else{
            try{
                await provider.provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }]
                  });
                return true
            }
            catch(switchError){
                console.error("❌ Error in Switching Network: ", switchError)
                if(switchError.code == 4902){
                    console.error("❌ Please add the network to your wallet and try again !")
                }
                return switchError
            }
        }
    }

    async transferERC20(receiver_address, signer, contract_address, transfer_amount) {
        const contract = new this.ethers.Contract(contract_address, abis.erc20Abi, signer);
        const tx = await contract.transfer(receiver_address, transfer_amount);
        await tx.wait()
        return tx.hash
    }

    async getCurrentChainId(provider){
        const network = await provider.getNetwork()
        return network.chainId
    }

    async getCurrentChainName(provider){
        const network = await provider.getNetwork()
        return network.name
    }

}

module.exports = Wallet