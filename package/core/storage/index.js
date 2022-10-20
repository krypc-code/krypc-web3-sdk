const MainInitializer = require("../main")
const base = require("../../base")
const wrapper_packages = base.wrapperPackages

class Storage extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
        this.ipfsClient = wrapper_packages.ipfs(new URL(this.IPFS_CLIENT_URL))
        this.ipfsGateway = this.IPFS_GATEWAY_URL + "/ipfs/"
    }

    async uploadtoIPFS(file) {
        const added = await this.ipfsClient.add(file)
        return added.path
    }

    async getFileFromIPFS(hash) {
        const file = await fetch(`${this.ipfsGateway}${hash}`)
        const fileContent = await file.json()
        return fileContent
    }

    async getGatewayLink(hash) {
        return `${this.ipfsGateway}${hash}`
    }

}

module.exports = Storage