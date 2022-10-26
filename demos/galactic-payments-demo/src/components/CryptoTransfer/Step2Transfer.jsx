import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar} from 'react-bootstrap'
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");


const Step2Transfer = ({provider, signer, account, setProgressValue, receiverAddress, receiverEnsName, completeStep2}) => {

    const[polygonBorder, setPolygonBorder] = useState("1px solid orange");
    const [polygonTextColor, setPolygonTextColor] = useState("white")
    const[ethereumBorder, setEthereumBorder] = useState("1px solid orange");
    const [ethereumTextColor, setEthereumTextColor] = useState("white")
    const [chosenChain, setChosenChain] = useState(null);

    const validateInput = () => {
        if(!chosenChain){
            alert("Please choose a chain to proceed !")
            return false
        }
        completeStep2(chosenChain)
    }

  return (
    <>
     <div style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", textAlign:"center"}}>
    <h5 style={{color:"orange"}}>Step 2: Choose chain of transfer</h5>
    <br />
    <Row style={{marginBottom:"3%"}}>
        <Col onClick={()=>{
            setPolygonBorder("7px solid orange")
            setPolygonTextColor("orange")
            setEthereumBorder("1px solid orange")
            setEthereumTextColor("white")
            setChosenChain("polygon")
        }} md={6}>
        <img alt= "KrypC Logo" height="120px" width="220" style={{margin: "20px", borderRadius:"10px", background:"white", cursor:"pointer", padding:"4%", border:polygonBorder}} src="https://cryptologos.cc/logos/polygon-matic-logo.png"></img>
        <p style={{color:polygonTextColor}}>MATIC (Mumbai Testnet)</p>
        </Col>
        <Col onClick={()=>{
            setEthereumBorder("7px solid orange")
            setEthereumTextColor("orange")
            setPolygonBorder("1px solid orange")
            setPolygonTextColor("white")
            setChosenChain("ethereum")
        }} md={6}>
        <img alt= "KrypC Logo" height="120px" width="200" style={{margin: "20px", borderRadius:"10px", background:"white", cursor:"pointer", padding:"4%", border:ethereumBorder}} src="https://d33wubrfki0l68.cloudfront.net/9e72bf7f221f56a4771559f5e7792c64c1ae506d/858e7/static/9e43837989f5a675de707424188ea962/2a657/ethereum-logo-portrait-black.png"></img>
        <p style={{color:ethereumTextColor}}>ETH (Goerli Testnet)</p>
        </Col>
    </Row>
    <Button onClick={()=>validateInput()} size="lg" variant="outline-warning">Proceed</Button>
    </div>
    </>
  )
}

export default Step2Transfer