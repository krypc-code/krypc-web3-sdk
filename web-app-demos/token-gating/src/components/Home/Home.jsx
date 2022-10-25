import { useState } from 'react'
import {Container, Button, Modal, Spinner} from 'react-bootstrap'
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
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const connectWallet = async () => {
    var walletOptions = [
      "coinbase",
      "walletconnect"
    ]
    const [provider, signer, address] = await Web3Engine.Utils.connectWallet(walletOptions)
    setProvider(provider)
    setSigner(signer)
    setAddress(address)
    console.log(address)
    const time_now = Date.now()
    const signature = await Web3Engine.Wallet.signMessage(`Signing in to the token gating demo from address ${address} at timestamp ${time_now}`, signer)
    if(signature) {
      setModalTitle("Validating access")
      setModalContent("Please wait. Checking whether you can access the website !")
      setSpinnerStatus(true)
      setShowModal(true)
    }

  }


  const mintNft = async () => {
    
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
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

        <Container style={{color:"white", textAlign:"center", marginTop:"10%"}} fluid>
          <div style={{padding:"2%", marginLeft:"25%", marginRight:"25%",borderRadius:"30px", border: "1px solid white"}}>
            <h1>Hi There, welcome to the token gating demo !</h1>
            <h5>You need to have a KrypC Editions NFT to be able to access this website !</h5>
            <br />
            <img style={{borderRadius:"30px", marginBottom:"3%"}} src='https://i.seadn.io/gae/vm5IJrKr3XvzbcGB-Fd_H01sAyUcpwCIFynP3dota_2H9QivHd2Iz6JdgIzT_i4U9ryvMeJq3YDfrAAA6Su6vys4Dn_L9-z0kfuPf0E?auto=format&w=1000' width={200}></img>
            <br />
            <Button onClick = {async ()=>{
              await connectWallet()
            }} variant="outline-light">Connect Wallet</Button>
          </div>
          <div style={{marginTop:"7%"}}>
          <h6>Don't have an access token ? Click the below button to mint a KrypC Editions NFT</h6>
          <Button onClick = {async ()=>{
              await mintNft()
            }} variant="outline-light">Mint NFT</Button>
          </div>
        </Container>
    </>
  )
}

export default Home