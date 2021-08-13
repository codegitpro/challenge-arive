import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "@this/pages";
import { ROUTES } from "@this/constants";

export const Router = React.memo(() => (
    <BrowserRouter>
        <Switch>
            {/* PUBLIC */}
            <Route exact path={ROUTES.HOME} component={HomePage} />
        </Switch>
    </BrowserRouter>
));
