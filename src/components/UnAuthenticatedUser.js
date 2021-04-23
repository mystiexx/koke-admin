import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PUBLIC_PATHS } from "../constants";
import { PUBLIC_ROUTES } from "../routes";
import { ChakraProvider } from "@chakra-ui/react";

const { LOGIN } = PUBLIC_PATHS;
export function UnauthenicatedUser() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Switch>
          {PUBLIC_ROUTES.map(({ page, path, exact }) => (
            <Route key={path} component={page} path={path} exact={exact} />
          ))}
          <Redirect from="/*" to={LOGIN} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
