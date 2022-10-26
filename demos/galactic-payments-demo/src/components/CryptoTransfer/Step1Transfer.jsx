import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar} from 'react-bootstrap'
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");

const Step1Transfer = ({provider, signer, account, setProgressValue, completeStep1}) => {

  useEffect(()=>{
    setProgressValue(20)
  })

  const [transferToAddress, setTransferToAddress] = useState("");
  const [ensName, setEnsName] = useState("");

  const validateInput = async () => {
    // check if it is a ens name
    if(transferToAddress.endsWith(".eth")){
      var resolvedAddress = await Web3Engine.Utils.resolveENStoAddress(transferToAddress);
      if(resolvedAddress == null){
        alert("Invalid ENS Name");
        return false;
      }
      else if(resolvedAddress == account){
        alert("Cannot transfer to self");
        return false;
      }
      else{
        setEnsName(transferToAddress)
        setTransferToAddress(resolvedAddress);
        console.log("ENS Name Resolved to Address: " + resolvedAddress);
        completeStep1(resolvedAddress, transferToAddress);
        return true;
      }
    }
    // check if address is valid
    var isValid = await Web3Engine.Utils.validateAddress(transferToAddress);
    if(!isValid){
      alert("Invalid Input !")
      return false;
    }
    else if(transferToAddress == account){
      alert("Cannot transfer to self");
      return false;
    }
    completeStep1(transferToAddress, ensName);
    return true;
  }



  return (
    <>
    <div style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", textAlign:"center"}}>
    <h5 style={{color:"orange"}}>Step 1: Enter address / ENS Domain you wish to transfer to !</h5>
    <br />
    <input onChange={(e)=>setTransferToAddress(e.target.value)} style={{width:"100%", height:"50px", borderRadius:"10px", border:"1px solid white", fontSize:"1.2rem", textAlign:"center", background:"none", color:"white", marginBottom:"5%"}} type="text" placeholder="Enter Address / ENS Domain here"></input>
    <Button onClick={()=>validateInput()} size="lg" variant="outline-warning">Proceed</Button>
    </div>
    </>
  )
}

export default Step1Transfer