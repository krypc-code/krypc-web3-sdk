import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar, Modal, Spinner} from 'react-bootstrap'
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");
const ethers = Web3Engine.ethers


const Step4Transfer = ({provider, signer, account, setProgressValue, receiverAddress, receiverEnsName, chosenChain, transferAmount, completeStep4}) => {
    
    const [formattedChainName, setFormattedChainName] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [transferChainId, setTransferChainId] = useState(null);

    const [show, setShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);

    const [transactionStatus, setTransactionStatus] = useState("Processing your transaction. Please confirm the transaction and wait for it to be mined !");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    useEffect(()=>{
        var chain_id;
        if(chosenChain=="ethereum"){
            setFormattedChainName("Ethereum (Goerli)")
            setTransferChainId(5)
            setCurrency("ETH")
        }
        else if(chosenChain=="polygon"){
            setFormattedChainName("Polygon (Mumbai)")
            setTransferChainId(80001)
            setCurrency("MATIC")
        }
    })


    const transferCrypto = async () => {
        // first get current chain id
        var current_chain_id = await Web3Engine.Wallet.getCurrentChainId(provider);

        // convert transfer amount to wei
        var ethers_to_wei = ethers.utils.parseUnits(transferAmount.toString(), "ether");

        if(current_chain_id == transferChainId){
            // if current chain id is same as transfer chain id, then just transfer
            setShow(true)
            var txHash = await Web3Engine.Wallet.transfer(receiverAddress, signer, ethers_to_wei);
            if(!txHash){
                setShow(false)
                alert("Transfer failed !")
                return
            }
            setTransactionStatus("Transaction Successful!");
            setShowSpinner(false);
            completeStep4(txHash);
        }
        else{
            var switchStatus = await Web3Engine.Wallet.switchNetwork(provider, transferChainId)
            if(switchStatus){
                console.log("Switched network successfully !")
                setShow(true)
            }
            var txHash = await Web3Engine.Wallet.transfer(receiverAddress, signer, ethers_to_wei);
            if(!txHash){
                setShow(false)
                alert("Transfer failed !")
                return
            }
            setTransactionStatus("Transaction Successful! ");
            setShowSpinner(false);
            completeStep4(txHash)
        }

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
          <Modal.Title>Processing Crypto Transfer  {showSpinner && <Spinner style={{marginLeft:"10px"}}  animation="border" />}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionStatus}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    <div style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", textAlign:"center"}}>
    <h5 style={{color:"orange"}}>Final Step: Confirm Details</h5>
    <br />
    <h6>Receiver Address: {receiverAddress}</h6>
    {receiverEnsName && <h6>Receiver ENS Name: {receiverEnsName}</h6>}
    <h6>Chain: {formattedChainName}</h6>
    <h6>Amount: {transferAmount} {currency}</h6>
    <br />
    <Button onClick={()=>{transferCrypto()}} size="lg" variant="outline-warning">Confirm & Transfer</Button>
    </div>
    </>
  )
}

export default Step4Transfer