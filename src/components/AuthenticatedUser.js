import React from 'react'
import Layout from "../layout";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PROTECTED_PATHS } from "../constants";
import { ChakraProvider } from "@chakra-ui/react";

const { LAYOUT: HOME } = PROTECTED_PATHS;
export function AuthenticatedUser () {
    return (
        <ChakraProvider>
      <BrowserRouter>
        <Switch>
          <Route path={HOME} component={Layout} />
          <Redirect from="/*" to={HOME} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>

    )
}

