// this package exports all the necessary things for the sdk such as the base packages, contract abis, etc. 

const wrapperPackages = require("./wrappers")
const abis = require("./abis")
const bytecodes = require("./bytecodes")

module.exports = {
    wrapperPackages,
    abis,
    bytecodes
}
