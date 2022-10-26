import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
    rpc: {
        80001: 'https://matic-mumbai.chainstacklabs.com',
          },
      appName: "Web 3 Modal Demo", // Required
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {

        rpc: {
        80001: 'https://matic-mumbai.chainstacklabs.com',
              },
              appName: "Web 3 Modal Demo", // Required
    }
  }
};
