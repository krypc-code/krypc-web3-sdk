const wallet_class = require("./wallet")
const storage_class = require("./storage")
const MainInitializer = require("./main")


class Web3Engine extends MainInitializer {

    constructor(API_KEY) {
        super(API_KEY)
        this.Wallet = new wallet_class(API_KEY)
        this.Storage = new storage_class(API_KEY)
    }

}

module.exports = {
    Web3Engine
}