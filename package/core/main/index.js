const base = require("../../base")
const wrapper_packages = base.wrapperPackages
const abis = base.abis

class MainInitializer {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.IPFS_CLIENT_URL = `https://web3-proxy.krypcore.com/ipfsClient/${apiKey}/api/v0` // will be changed with API key & chain ID appended to it
        this.IPFS_GATEWAY_URL = `https://web3-proxy.krypcore.com/ipfsGateway/${apiKey}`
        // this.POLYGON_MUMBAI_URL = `https://web3-proxy.krypcore.com/api/v0/rpc/80001/${apiKey}` // will be changed with API key appended to it
        // this.ETHEREUM_GOERLI_URL = `https://web3-proxy.krypcore.com/api/v0/rpc/5/${apiKey}` // will be changed with API key appended to it
        this.POLYGON_MUMBAI_URL = "https://rpc.ankr.com/polygon_mumbai",
        this.ETHEREUM_GOERLI_URL = "https://goerli.infura.io/v3/cd35adac452f46bfbec99cc4763ff382"
        this.ETHEREUM_MAINNET_URL = "https://rpc.ankr.com/eth" // will be changed with API key appended to it
        this.ethers = wrapper_packages.ethers
        this.web3Modal = wrapper_packages.web3modal
    }

    getRPCURL(chainId){
        if(chainId == 80001){
            return this.POLYGON_MUMBAI_URL
        }
        else if(chainId == 5){
            return this.ETHEREUM_GOERLI_URL
        }
        else if(chainId == 1){
            return this.ETHEREUM_MAINNET_URL
        }
        else {
            throw new Error("Chain ID currently not supported !")
        }
    }

}


module.exports = MainInitializer