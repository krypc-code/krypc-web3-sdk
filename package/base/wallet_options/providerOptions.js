const WalletConnect = require("@walletconnect/web3-provider");
const {CoinbaseWalletSDK} = require("@coinbase/wallet-sdk");


const returnProviderOptions = async (walletOptions) => {
    const providerOptions = {}
    if(!walletOptions)
        return providerOptions
    walletOptions.map((option)=>{
        if(option == "coinbase"){
            providerOptions["walletlink"] = {
                package: CoinbaseWalletSDK, // Required
                options: {
                rpc: {
                    80001: '',
                    5: ''
                      },
                  appName: "Web 3 Modal Demos", // Required
                }
            }
        }
        else if(option == "walletconnect") {
            providerOptions["walletconnect"] = {
                package: WalletConnect.default, // required
                options: {
            
                    rpc: {
                    80001: '',
                    5: ''
                          },
                   appName: "Web 3 Modal Demo", // Required
                }
            }
        }
        else{
            throw new Error("Chosen wallet not supported")
        }

    })
    return providerOptions
}

module.exports = returnProviderOptions