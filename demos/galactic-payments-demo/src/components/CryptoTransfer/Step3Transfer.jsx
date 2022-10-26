import { useState, useEffect } from 'react';
import {Container, Button, Row, Col, ProgressBar} from 'react-bootstrap'
const krypcWeb3 = require('@krypc/web3-sdk');
const Web3Engine = new krypcWeb3.Web3Engine("API_KEY");


const Step3Transfer = ({provider, signer, account, setProgressValue, receiverAddress, receiverEnsName, chosenChain, completeStep3}) => {

    const [accountBalance, setAccountBalance] = useState(null);
    const [formattedChainName, setFormattedChainName] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setAmount] = useState(null);
    const [formattedValue, setFormattedValue] = useState(null);

    useEffect(()=>{
        var chain_id;
        if(chosenChain=="ethereum"){
            setFormattedChainName("Ethereum (Goerli)")
            chain_id = 5;
            setCurrency("ETH")
        }
        else if(chosenChain=="polygon"){
            setFormattedChainName("Polygon (Mumbai)")
            chain_id = 80001;
            setCurrency("MATIC")
        }
        getAccountBalance(chain_id)
    })

    const validateInput = async () => {
        // convert amount to a float
        var amount_float = parseFloat(amount);
        if(!amount_float || amount_float<0){
            alert("Please enter a valid amount")
            return false
        }
        else if(amount_float>accountBalance){
            alert("Insufficient funds")
            return false
        }
        else{
            completeStep3(amount_float)
            return true
        }
    }

    async function getAccountBalance(chain_id){
        var account_balance = await Web3Engine.Wallet.getBalance(account, chain_id);
        account_balance = parseFloat(account_balance);
        account_balance = account_balance.toFixed(6);
        setAccountBalance(account_balance);
    }

  return (
    <>
    <div style={{marginTop:"5%", marginLeft:"5%", marginRight:"5%", textAlign:"center"}}>
    <h5 style={{color:"orange"}}>Step 3: Enter amount (in {currency}) you wish to transfer</h5>
    {accountBalance && <h6>Your available balance on {formattedChainName} is {accountBalance} {currency} </h6>}
    <br />
    <input onChange={(e)=>{
        setAmount(e.target.value)
    }} style={{width:"80%", height:"50px", borderRadius:"10px", border:"1px solid white", fontSize:"1.2rem", textAlign:"center", background:"none", color:"white", marginBottom:"5%"}} type="text" placeholder={`Enter Amount here in ${currency}`}></input>
    <br />
    <Button onClick={()=>{validateInput()}} size="lg" variant="outline-warning">Proceed</Button>
   </div>
    </>
  )
}

export default Step3Transfer