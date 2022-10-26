import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar, Modal, Spinner} from 'react-bootstrap'
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");
const ethers = Web3Engine.ethers


const SuccessTransfer = ({provider, signer, account, setProgressValue, receiverAddress, receiverEnsName, chosenChain, transferAmount, txHash, returnBacktoHome}) => {
    
    const [show, setShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [receiptStatus, setReceiptStatus] = useState("Generating receipt. Please wait !");
    const [receiptUrl, setReceiptUrl] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const generateReceipt = async () => {
        setShow(true)
        var receipt_content;
        if(receiverEnsName){
           receipt_content = {
              "payment_sender": account,
              "receiver": receiverAddress,
              "receiver_ens": receiverEnsName,
              "transfer_amount": transferAmount,
              "chain": chosenChain,
              "tx hash": txHash
          }
        }
        else{
           receipt_content = {
              "payment_sender": account,
              "receiver": receiverAddress,
              "transfer_amount": transferAmount,
              "chain": chosenChain,
              "tx hash": txHash
          }
        }
        const receipt = JSON.stringify(receipt_content);
        const cid = await Web3Engine.Storage.uploadtoIPFS(receipt);
        const receipt_url = Web3Engine.Storage.ipfsGateway + cid;
        setReceiptUrl(receipt_url);
        setReceiptStatus("Receipt generated successfully ! You can view it at the following link ! ");
        setShowSpinner(false);
    }
  
    return (
    <>
        <Modal style={{fontFamily:"Orbitron"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Generating IPFS Receipt of Payment {showSpinner && <Spinner style={{marginLeft:"10px"}}  animation="border" />}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {receiptStatus}
          {receiptUrl && <a href={receiptUrl}>IPFS Receipt Link</a>}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    <div style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", textAlign:"center"}}>
    <h2 style={{color:"orange"}}>SUCCESS !</h2>
    <br />
    <h5>Your transfer went through successfully !</h5>
    <br />
    <img alt="Success" src="https://i.imgflip.com/6w8poi.jpg" style={{width:"50%", height:"auto", marginBottom:"4%", borderRadius:"30px"}}></img>
    <Row>
        <Col md={6}>
        <Button onClick={()=>{generateReceipt()}} size="lg" variant="outline-warning">Generate IPFS Receipt</Button>
        </Col>
        <Col md={6}>
        <Button onClick={()=>{returnBacktoHome()}} size="lg" variant="outline-warning">Make Another Transfer</Button>
        </Col>
    </Row>
    </div>
    </>
  )
}

export default SuccessTransfer