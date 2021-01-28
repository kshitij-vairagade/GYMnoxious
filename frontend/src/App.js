import React, { Component } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Offer} from './components/Pages/Offer'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {products: [], filteredProducts}
  }
  render(){
    return (
      <div className="container">
        <h1>
          <center>GYMnoxious</center>
        </h1>
        <Router>
          <Sidebar />
          <Switch>
            <Route path='/offers' exact component={Offer} />
          </Switch>
        </Router>
        <hr />
        <div className="row">
          <div className="col-md-8">Gym Owners</div>
          <div className="col-md-8">Members</div>
        </div>
      </div>
    );
  }
}

export default App;
