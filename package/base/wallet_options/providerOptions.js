const WalletConnect = require("@walletconnect/web3-provider");
const {CoinbaseWalletSDK} = require("@coinbase/wallet-sdk");
const Torus = require("@toruslabs/torus-embed");
const ethProvider = require("eth-provider")


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
        else if(option == "torus") {
            providerOptions["torus"] = {
                package: Torus.default, // required
                options: {
                  showTorusButton: true, // optional
                  rpc: {
                    80001: '',
                    5: ''
                          },
       
                },
              };
        }
        else if(option=="frame") {
            providerOptions["frame"] = {
                package: ethProvider, // required
              };
        }
        else{
            throw new Error("Chosen wallet not supported")
        }

    })
    return providerOptions
}

module.exports = returnProviderOptions