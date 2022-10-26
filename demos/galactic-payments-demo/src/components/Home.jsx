import React from 'react'
import {Container, Row, Button} from 'react-bootstrap'

const Home = () => {

  return (
    <>

    <Container fluid style={{color:"white"}}>
      <div style={{marginTop:"0px", textAlign:"left", marginLeft:"0px"}}>
      <img onClick={()=>window.location.href="https://krypc.com"} alt= "KrypC Logo" height="60px" width="130" style={{margin: "20px", borderRadius:"10px", background:"white", cursor:"pointer"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Krypc_Logo.png/2560px-Krypc_Logo.png"></img>
      </div>
      <Row style={{fontFamily: "Orbitron",textAlign:"center", marginTop:"9%"}}>
        <h1 style={{fontSize:"6rem"}}>Galactic Payments ⚡️</h1>
        <p style={{fontSize:"2.2rem"}}>Your One Stop Platform for Payments</p>
        {/* <p style={{fontSize:"1.2rem"}}>Make payments to any EVM addresses or ENS Domains in a single click !</p> */}
        <div style={{marginTop:"3%"}}>
          
        <p style={{fontSize:"1.2rem", fontWeight:"bold", color:"white"}}> 🚀 Built using KrypC's Web3 Engine </p>
        <Button onClick={()=>window.location.href = "/dapp"} style={{height:"50px", fontFamily: "Orbitron"}} variant="outline-light">Unlock Web3</Button>{' '}
        </div>
      </Row>

      {/* <Row style={{border:"1px solid white", width:"50%", textAlign:"center", height:"400px", marginLeft:"25%", marginTop:"2%", borderRadius:"20px"}}>

      </Row> */}


    </Container>
      
    </>
  )
}

export default Home