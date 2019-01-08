import React, { Component } from "react";
// import { Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import FormView from './Form';
import { Card, Placeholder } from 'semantic-ui-react'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          

          <Card.Group itemsPerRow={2}>
            <Card>
              <Card.Content>
                Moneda A
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                Moneda B
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
          </Card.Group>
          <FormView />
        </div>
      </div>
    );
  }
}

export default App;
