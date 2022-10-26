import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar} from 'react-bootstrap'
import Step1Transfer from './CryptoTransfer/Step1Transfer';
import Step2Transfer from './CryptoTransfer/Step2Transfer';
import Step3Transfer from './CryptoTransfer/Step3Transfer';
import Step4Transfer from './CryptoTransfer/Step4Transfer';
import SuccessTransfer from './CryptoTransfer/SuccessTransfer';
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");
const ethers = Web3Engine.ethers;

const Dapp = () => {

    // state variables
    const [connectWalletButtonText, setConnectWalletButtonText] = useState("Connect Wallet");
    const [walletConnectedStatus, setWalletConnectedStatus] = useState(false);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [chainId, setChainId] = useState(null);


    const [progressValue, setProgressValue] = useState(0);


    const [receiverEnsName, setReceiverEnsName] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [chosenChain, setChosenChain] = useState(null);
    const [transferAmount, setTransferAmount] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const [step1TransferStatus, setStep1TransferStatus] = useState(false);
    const [step2TransferStatus, setStep2TransferStatus] = useState(false);
    const [step3TransferStatus, setStep3TransferStatus] = useState(false);
    const [step4TransferStatus, setStep4TransferStatus] = useState(false);
    const [successTransferStatus, setSuccessTransferStatus] = useState(false);

    useEffect(()=>{
        checkAndUpdateWallet()
    },[signer])


    const checkAndUpdateWallet = async () => {
        if(walletConnectedStatus){
            console.log("Signer & Provider Update Successful")
            setBalance(null)
            var new_chainName = await Web3Engine.Wallet.getCurrentChainName(provider);
            setChainName(new_chainName);
            var new_account_balance = await Web3Engine.Wallet.getBalance(account, chainId);
            new_account_balance = parseFloat(new_account_balance);
            // round off balance to 4 decimal places
            new_account_balance = new_account_balance.toFixed(4);
            setBalance(new_account_balance);
            setAccount(account);
        }
        else{
            console.log("Signer & Provider Update Unsuccessful")
            DisconnectWallet()
        }
    }


    const DisconnectWallet = async () => {
        console.log("Disconnecting wallet")
        // console.log(account)
        setWalletConnectedStatus(false);
        setProvider(null);
        setAccount(null);
        setBalance(null);
        setSigner(null);
        setChainName(null);
        setChainId(null);
        setProgressValue(0);
        returnBacktoHome()
        setConnectWalletButtonText("Connect Wallet");
    }


    const getCurrencySymbol = (chainIdVal) => {
        switch(chainIdVal){
            case 1:
                return "ETH";
            case 80001:
                return "MATIC";
            case 137:
                return "MATIC";
            case 56:
                return "BNB";
            case 97:
                return "BNB";
            case 250:
                return "FTM";
            case 43114:
                return "AVAX";
            case 43113:
                return "AVAX";
            case 5:
                return "ETH";
            case 42:
                return "ETH";
            case 3:
                return "ETH";
            case 4:
                return "ETH";
            case 100:
                return "XDAI";
            default:
                return "ETH";
        }
    }


  const connectWallet = async () => {
    // connect wallet
    console.log("Connect Wallet Clicked !")
    
        // connect wallet using web3engine
        const options = ["coinbase", "walletconnect"]
        const [provider, signer, account] = await Web3Engine.Utils.connectWallet(options);

        provider.on("network", async (newNetwork, oldNetwork) => {
            if (oldNetwork) {
                console.log("Network has changed !")
                var new_chainId = await Web3Engine.Wallet.getCurrentChainId(provider);
                if(new_chainId !== 1 && new_chainId!==80001 && new_chainId!==5){
                    alert("Please switch to Goerli Testnet or Mumbai Testnet or Ethereum Mainnet");
                    DisconnectWallet();
                    return;
                }
                setChainId(new_chainId);
                var new_signer = await provider.getSigner()
                setProvider(provider)
                setSigner(new_signer)
            }
        });


        // confirm login by signing message
        const message = `I confirm that I  am ${account} and am connecting my wallet to Galactic Payments`;
        const signature = await Web3Engine.Wallet.signMessage(message, signer);

        // validate signature via smart contract
        var validStatus = false
        validStatus = await Web3Engine.Wallet.verifySignatureOffChain(message, signature, account);

        if(validStatus){
            setProvider(provider);
            // get chain ID using Web3 Engine
            const chainId = await Web3Engine.Wallet.getCurrentChainId(provider);
            if(chainId !== 1 && chainId!==80001 && chainId!==5){
                alert("Please switch to Goerli Testnet or Mumbai Testnet or Ethereum Mainnet");
                DisconnectWallet();
                return;
            }
            setWalletConnectedStatus(true);
            setChainId(chainId);
            setSigner(signer);
            setAccount(account) 

            setConnectWalletButtonText("Disconnect");

    
            // get chain Name using Web3 Engine
            const chainName = await Web3Engine.Wallet.getCurrentChainName(provider);
            setChainName(chainName);
    
            // get account balance using Web3 Engine
            var account_balance = await Web3Engine.Wallet.getBalance(account, chainId);
            // convert account balance to float from string
            account_balance = parseFloat(account_balance);
            // round off balance to 4 decimal places
            account_balance = account_balance.toFixed(4);
    
            setBalance(account_balance);

        }

        else{
            alert("Invalid Signature");
            return;
        }
  }


  const completeStep1 = async (toAddress, ensName) => {
    setProgressValue(40);
    setReceiverEnsName(ensName);
    setReceiverAddress(toAddress);
    setStep1TransferStatus(true);
  }

    const completeStep2 = async (chosenChain) => {
        setChosenChain(chosenChain);
        setProgressValue(60);
        setStep2TransferStatus(true);
    }

    const completeStep3 = async (amount) => {
        setTransferAmount(amount);
        setProgressValue(80);
        setStep3TransferStatus(true);
    }

    const completeStep4 = async (txHash) => {
        setTxHash(txHash);
        setProgressValue(100);
        setStep4TransferStatus(true);
    }

    const returnBacktoHome = async () => {
        setProgressValue(0);
        setStep1TransferStatus(false);
        setStep2TransferStatus(false);
        setStep3TransferStatus(false);
        setStep4TransferStatus(false);
        setSuccessTransferStatus(false);
    }
  
  
  return (
    <>

    <Container fluid style={{fontFamily: "Orbitron", color:"white"}}>
        <Row style={{textAlign:"right", marginTop:"1%", marginRight:"1%"}}>
            <Col style={{padding:"0.4%"}} md={3}>
                <Row style={{textAlign:"left", marginLeft:"1%"}}>
                    <h1 style={{fontSize:"1.4rem", cursor:"pointer"}} onClick={()=>window.location.href="/"}>Galactic Payments ⚡️</h1>
                </Row>
            </Col>
            <Col md={9}>
                <Row>
                <Col md={9}>
                <p style={{fontSize:"1rem", marginBottom:"0rem"}}>{account ? `⚡️ Connected Account: ${account.slice(0, 5) + "..." + account.slice(account.length-5, account.length)} (${chainName ? chainName : ''})`:''}</p>
                <p style={{fontSize:"1rem"}}>{balance ? `Balance: ${balance} ${getCurrencySymbol(chainId)}`:''}</p>
                </Col>
                <Col md={3}>
                <Button onClick={()=> {
                    if(provider){
                        DisconnectWallet()
                    }
                    else{
                        connectWallet()
                    }
                }} style={{height:"50px", fontFamily: "Orbitron"}} variant="outline-light">{connectWalletButtonText}</Button>{' '}
                </Col>
                </Row>
            </Col>
        </Row>
        <div style={{textAlign:"center"}}>
        <div style={{minHeight:"400px", padding:"2%", border:"1px solid white", marginLeft:"25%", marginRight:"25%", marginTop:"8%", borderRadius:"30px"}}>
            <h1>Make a Galactic Transfer</h1>
            <ProgressBar variant="success" style={{height:"8px", marginBottom:"3%"}} animated now={progressValue}/>
            {!walletConnectedStatus && <p style={{marginTop:"15%", fontSize:"1.4rem", color:"orange"}}>Connect Wallet to Proceed !</p>}
            {walletConnectedStatus && !step1TransferStatus && <Step1Transfer provider={provider} signer={signer} account={account} setProgressValue={setProgressValue} completeStep1={completeStep1}/>}
            {walletConnectedStatus && step1TransferStatus && !step2TransferStatus && <Step2Transfer provider={provider} signer={signer} account={account} setProgressValue={setProgressValue} receiverAddress={receiverAddress} receiverEnsName={receiverEnsName} completeStep2={completeStep2}/>}
            {walletConnectedStatus && step1TransferStatus && step2TransferStatus && !step3TransferStatus && <Step3Transfer provider={provider} signer={signer} account={account} setProgressValue={setProgressValue} receiverAddress={receiverAddress} receiverEnsName={receiverEnsName} chosenChain={chosenChain} completeStep3={completeStep3}/>}
            {walletConnectedStatus && step1TransferStatus && step2TransferStatus && step3TransferStatus && !step4TransferStatus && <Step4Transfer provider={provider} signer={signer} account={account} setProgressValue={setProgressValue} receiverAddress={receiverAddress} receiverEnsName={receiverEnsName} chosenChain={chosenChain} transferAmount={transferAmount} completeStep4={completeStep4}/>}
            {walletConnectedStatus && step1TransferStatus && step2TransferStatus && step3TransferStatus && step4TransferStatus && !successTransferStatus && <SuccessTransfer provider={provider} signer={signer} account={account} setProgressValue={setProgressValue} receiverAddress={receiverAddress} receiverEnsName={receiverEnsName} chosenChain={chosenChain} transferAmount={transferAmount} txHash={txHash} returnBacktoHome={returnBacktoHome}/>}
            
        </div>
        </div>
        <div style={{marginTop:"5%", color:"yellow", textAlign:"center", marginBottom:"2%"}}>
            <h6>Developed completely using KrypC's Web3 Engine 🚀</h6>
        </div>

    </Container>
    </>
  )
}

export default Dapp