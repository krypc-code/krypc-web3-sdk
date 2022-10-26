import {  BrowserRouter,  Switch, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import Dapp from "./Dapp";

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dapp" component={Dapp} />
        </Switch>
    </BrowserRouter>
    </>
  )
}

export default Main