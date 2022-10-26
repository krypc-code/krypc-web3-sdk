import logo from './logo.svg';
import './App.css';
import {Container, Button, Modal, Spinner} from 'react-bootstrap'
import { useState } from 'react';
const sdk = require("@krypc/web3-sdk")
const Web3Engine = new sdk.Web3Engine("aje29azxmsi3sw0")

function App() {

  const [provider, setProvider] = useState('')
  const [signer, setSigner] = useState('')
  const [address, setAddress] = useState('')
  const [connectedStatus, setConnectedStatus] = useState(false)
  const [chainId, setChainId] = useState('')
  const [chainName, setChainName] = useState('')

  async function connectWallet() {
    const walletOptions = ["coinbase", "walletconnect"]
    const [provider, signer, address] = await Web3Engine.Utils.connectWallet(walletOptions)
    setAddress(address)
    setProvider(provider)
    setSigner(signer)
    setConnectedStatus(true)
    const chainId = await Web3Engine.Wallet.getCurrentChainId(provider)
    setChainId(chainId)
    const chainName = await Web3Engine.Wallet.getCurrentChainName(provider)
    setChainName(chainName)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connect Wallet Demo</h1>
        <Button style={{marginTop:"1%"}} onClick = {async ()=>{
              await connectWallet()
            }} variant="outline-light">{connectedStatus ? "Connected":"Connect Wallet"}</Button>
        {address && <h6 style={{marginTop:"5%"}}>Connected Address: {address}</h6>}
        {chainName && <h6 style={{marginTop:"1%"}}>Active Chain Name: {chainName}</h6>}
        {chainId && <h6 style={{marginTop:"1%"}}>Active Chain Id: {chainId}</h6>}
        
      </header>
    </div>
  );
}

export default App;
