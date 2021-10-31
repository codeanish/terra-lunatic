import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/404";
import LunaticAsylum from "./pages/lunatic-asylum";
import ScorePage from "./pages/score";

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ScorePage} />
                <Route exact path="/asylum" component={LunaticAsylum} />
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );  
};

export default Router;