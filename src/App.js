import React, { Component } from 'react'
import './App.css';
import { Switch, BrowserRouter  } from "react-router-dom";
import { AuthenticatedUser } from "./components/AuthenticatedUser";
import { UnauthenicatedUser } from "./components/UnAuthenticatedUser";
import { ChakraProvider } from "@chakra-ui/react";


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount(){
    const token = localStorage.token;
    if(token) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }
    
  }

  render() {
    const {loggedIn} = this.state;

    return (
<ChakraProvider>
        <BrowserRouter>
          <Switch>
            {!loggedIn && <UnauthenicatedUser />}

            {loggedIn && <AuthenticatedUser />}
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    )
  }
}
export default App;
