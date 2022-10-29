import { useState } from 'react'
import {Container, Button, Modal, Spinner, Row, Col} from 'react-bootstrap'
import Tilt from 'react-parallax-tilt';
const sdk = require("@krypc/web3-sdk")
const Web3Engine = new sdk.Web3Engine("aje29azxmsi3sw0")

const Home = () => {

  const [provider, setProvider] = useState('')
  const [signer, setSigner] = useState('')
  const [address, setAddress] = useState('')

  const [showModal, setShowModal] = useState(false);
  const [spinnerStatus, setSpinnerStatus] = useState(false)
  const [modalTitle, setModalTitle] = useState("Validating access")
  const [modalContent, setModalContent] = useState("Please wait. Checking whether you can access the website !")
  const [chainName, setChainName] = useState("")
  const [chainId, setChainId] = useState("")
  const [balance, setBalance] = useState("")
  const [connectWalletButtonText, setConnectWalletButtonText] = useState("Connect Wallet")
  const [nftOwnershipStatus, setNftOwnershipStatus] = useState("checking")
  const [polygonScanLink, setPolygonScanLink] = useState("")

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const connectWallet = async () => {
    if(connectWalletButtonText != "Connect Wallet"){
      setConnectWalletButtonText("Connect Wallet")
      setProvider('')
      setSigner('')
      setAddress('')
      setChainName('')
      setChainId('')
      setBalance('')
      setNftOwnershipStatus("checking")
      return
    }
    var walletOptions = [
      "coinbase",
      "walletconnect"
    ]
    const [provider, signer, address] = await Web3Engine.Utils.connectWallet(walletOptions)
    const chainId = await Web3Engine.Wallet.getCurrentChainId(provider)
    setChainId(chainId)
    const chainName = await Web3Engine.Wallet.getCurrentChainName(provider)
    setChainName(chainName)
    if(chainId != 80001) {
      alert("please switch to mumbai testnet")
      return
    }
    setProvider(provider)
    setSigner(signer)
    setAddress(address)
    setConnectWalletButtonText("Disconnect ❌")
    const balance = await Web3Engine.Wallet.getBalance(address, chainId)
    setBalance(balance)
    const time_now = Date.now()
    const signature = await Web3Engine.Wallet.signMessage(`Signing in to the token gating demo from address ${address} at timestamp ${time_now}`, signer)
    if(signature) {
      // validate signature using web3 engine - offchain
      const isValid = await Web3Engine.Wallet.verifySignatureOffChain(`Signing in to the token gating demo from address ${address} at timestamp ${time_now}`, signature, address)
      if(!isValid) {
        alert("Invalid signature")
        return
      }
      setProvider(provider)
      setSigner(signer)
      setAddress(address)
      await validateAccess(provider, address)
    }
    else{
      alert("Signature denied lol")
    }

  }

  const validateAccess = async (provider,address) => {
    setModalTitle("Validating access")
    setModalContent("Please wait. Checking whether you can access the website !")
    setSpinnerStatus(true)
    setShowModal(true)
    const contract_abi = require("../../contract-artifacts/access_token_abi")
    const accessResult = await Web3Engine.Utils.callContractViewMethod(provider, "0xDA874d6B4180F279da69884072cf6238D77E573c", contract_abi,"balanceOf", [address])
    if(accessResult.toNumber() > 0) {
      setNftOwnershipStatus(true)
      setModalTitle("Access granted")
      setModalContent("You have access to the website ! You are eligible for exclusive perks !")
      setSpinnerStatus(false)
      return true
    }
    else{
      setNftOwnershipStatus(false)
      setModalTitle("Access denied")
      setModalContent("You do not have access to this website. KrypC Editions Access Token NFT was not detected in your wallet. Follow the instructions to mint and try again ! ")
      setSpinnerStatus(false)
      return false
    }
  }


  const mintNft = async () => {

    setSpinnerStatus(true)
    setModalTitle("Minting NFT")
    setModalContent(`Please wait. Minting KrypC Editions Access Token NFT ! Please confirm the tx in your wallet and wait for it to be mined !`)
    setShowModal(true)
    const contract_abi = require("../../contract-artifacts/access_token_abi")
    const contract_bytecode = require("../../contract-artifacts/access_token_bytecode")
    var txHash;
    try {
       txHash = await Web3Engine.Utils.callContractMethod(signer, "0xDA874d6B4180F279da69884072cf6238D77E573c", contract_abi, "mintNFT", [])
    }
    catch(e) {
      setModalTitle("Error")
      setModalContent("Transaction failed ! Try again. Make sure you have enough funds in your wallet !")
      setSpinnerStatus(false)
      return
    }
    setModalTitle("Transaction sent")
    var polygonscan_link = `https://mumbai.polygonscan.com/tx/${txHash}`
    setPolygonScanLink(polygonscan_link)
    setModalContent(`Transaction sent. Waiting for confirmation ! Track your status on Mumbai Polygonscan ! `)
    setSpinnerStatus(false)
    // reload page in 5 seconds
    setTimeout(function(){ window.location.reload(); }, 5000);
  }

  return (
    <>

<Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
          { spinnerStatus && <Spinner style={{marginLeft:"3%"}} animation="border" />}
        </Modal.Header>
        <Modal.Body>
          {modalContent}
          { polygonScanLink && <a href={polygonScanLink} target="_blank" style={{marginLeft:"3%"}}>Track on Polygonscan</a>}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

        <Container style={{color:"white", textAlign:"center", fontFamily:"silkscreen"}} fluid>
        <Row style={{textAlign:"right", marginTop:"2%", marginRight:"1%"}}>
            <Col style={{padding:"0.4%"}} md={3}>
                <Row style={{textAlign:"left", marginLeft:"1%"}}>
                    <h1 style={{fontSize:"1.4rem", cursor:"pointer"}} onClick={()=>window.location.href="/"}>Token Gating ⚡️</h1>
                </Row>
            </Col>
            <Col md={9}>
                <Row>
                <Col md={9}>
                <p style={{fontSize:"1rem", marginBottom:"0rem"}}>{address ? `⚡️ Connected Account: ${address.slice(0, 5) + "..." + address.slice(address.length-5, address.length)} (${chainName ? chainName : ''})`:''}</p>
                <p style={{fontSize:"1rem"}}>{balance ? `Balance: ${balance} ${Web3Engine.Utils.getCurrencySymbol(chainId)}`:''}</p>
                </Col>
                <Col md={3}>
                {address && <Button style={{height:"50px"}} onClick = {async ()=>{
              await connectWallet()
            }} variant="outline-light">{connectWalletButtonText}</Button>}
            </Col>
                </Row>
            </Col>
        </Row>
          <div style={{marginTop:"7%", padding:"2%", marginLeft:"25%", marginRight:"25%",borderRadius:"30px", border: "1px solid white"}}>
            <Row>
              <Col style={{textAlign:"left"}} md={6}>
                <h2>Token Gating</h2>
                <br />
                {nftOwnershipStatus==true && <> 
                <h5>Welcome ! ⚡️ <span style={{color:"#39FF14"}}> You are a holder of the KrypC Editions Unlock Web3 NFT Access Token granting you exclusive perks ! </span> Join our Discord for more announcements !</h5>
                <Button style={{height:"60px"}} onClick = {async ()=>{
            }
            } variant="outline-light">Join Discord !</Button>
                </>}
                {nftOwnershipStatus==="checking" && <h5>Welcome ! This is a token gated website. Connect your wallet that owns the KrypC Editions UNLOCK WEB3 NFT Access token to access this website !</h5>}
                {!nftOwnershipStatus && <h5> ⚠️ <span style={{color:"red"}}>You don't have a KrypC Editions Unlock Web3 NFT Access Token </span>, either mint a token or purchase one from opensea to get access ! <span style={{color:"orange"}}> Max supply of this NFT is 100, so mint fast ! </span></h5>}
                <br />
                <div style={{textAlign:"center"}}>
                {nftOwnershipStatus==="checking" && <Button style={{height:"50px"}} onClick = {async ()=>{
              await connectWallet()
            }} variant="outline-light">{connectWalletButtonText}</Button>}
            { !nftOwnershipStatus && <Row>
            <Col style={{textAlign:"left"}} md={4}>
            <Button style={{height:"60px"}} onClick = {async ()=>{
              await mintNft()
            }
            } variant="outline-light">Mint NFT</Button>
            </Col>
            <Col style={{textAlign:"left"}} md={8}>
            <Button style={{height:"60px"}} onClick = {async ()=>{
              window.open("https://testnets.opensea.io/collection/krypc-unlock-web3-access-tokens", '_blank')
            }
            } variant="outline-light">Take me to Opensea</Button>
            </Col>
          </Row>}
                </div>
              </Col>
              <Col md={6}>
                <Tilt>
              <img onClick={()=>window.open("https://testnets.opensea.io/collection/krypc-unlock-web3-access-tokens", '_blank')} style={{borderRadius:"30px", marginBottom:"3%", cursor:"pointer"}} src='https://web3-proxy.krypcore.com/ipfsGateway/aje29azxmsi3sw0/ipfs/Qmcuu6xxqyg98LWq1C97WqVEprQTbU6YPupAQg2SNigt7j' width={340}></img>
                </Tilt>              
              </Col>
            </Row>
          </div>
          <div style={{textAlign:"center", marginTop:"4%", marginLeft:"25%", marginRight:"25%", padding:"1%"}}>
            <h6>Built entirely using KrypC's Web3 Engine 🚀</h6>
          </div>
        </Container>
    </>
  )
}

export default Home