import React, { Component } from 'react'
import './App.css';
import Header from "./Components/Header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import About from "./Components/About/About.js"
import Service from "./Components/Programs/Service.js"
import Members from './Components/Members/Members';
import Login from './Components/Login/Login';
import Shop from './Components/Shop/Shop'


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    if(token){
      this.setState({loggedIn: true})
    }
  }

  render() {
    const {loggedIn} = this.state;

    return (
<Router>
            <div className="App">
                <Switch>
                  {
                    !loggedIn && (
                      <div className="body">
                      <Route exact path="/" component ={Login}/>
                      </div>
                    )
                  }

                  {
                    loggedIn && (
                      <Header>
                      <div className="body pb-4">
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/service" component={Service}/>
                    <Route exact path="/members" component={Members}/>
                    <Route exact path="/shop" component={Shop}/>
                    </div>
                    </Header>
                    )
                  }
                  
                </Switch>
            </div>
        </Router>
    )
  }
}
export default App;
