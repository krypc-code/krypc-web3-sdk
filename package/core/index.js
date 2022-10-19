const MainInitializer = require("./main")
const wallet_class = require("./wallet")
const storage_class = require("./storage")
const utils_class = require("./utils")
const nft_class = require("./nft")


class Web3Engine extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
        this.Wallet = new wallet_class(API_KEY)
        this.Storage = new storage_class(API_KEY)
        this.Utils = new utils_class(API_KEY)
        this.Nft = new nft_class(API_KEY)
    }

}

module.exports = {
    Web3Engine
}