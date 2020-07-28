import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from "./components/Layout";
import Portfolio from "./components/portfolio";
import Research from "./components/research";
import Trade from "./components/trade";
import { Switch } from "react-router-dom";
// import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
     
    return (
      <Layout>
          <Switch>
              <Route exact path='/portfolio' component={Portfolio} />    
                <Route path='/research' component={Research} />
                <Route path='/trade' component={Trade} />
                <Route exact path='/' component={Portfolio} />
          </Switch>
      </Layout>
    );
  }
}
