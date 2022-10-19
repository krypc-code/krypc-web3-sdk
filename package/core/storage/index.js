const MainInitializer = require("../main")
const base = require("../../base")
const wrapper_packages = base.wrapperPackages

class Storage extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
        this.ipfsClient = wrapper_packages.ipfs(new URL(this.IPFS_CLIENT_URL))
        this.ipfsGateway = this.IPFS_GATEWAY_URL + "/ipfs/"
    }

    uploadtoIPFS() {
        console.log("File uploaded to IPFS")
    }

    getfromIPFS(){
        console.log("File retrieved from IPFS")
    }

}

module.exports = Storage