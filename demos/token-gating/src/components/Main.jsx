import {  BrowserRouter,  Switch, Route } from "react-router-dom";
import Home from "./Home/Home";

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </BrowserRouter>
    </>
  )
}

export default Main