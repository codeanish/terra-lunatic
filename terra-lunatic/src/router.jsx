import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/404";
import ScorePage from "./pages/score";

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ScorePage} />
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );  
};

export default Router;