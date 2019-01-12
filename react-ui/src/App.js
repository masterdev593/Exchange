import React, { Component } from "react";
// import { Switch, Route } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";
// import FormView from './Form';
import { Container } from 'semantic-ui-react';
import MainForm from "./Form/MainForm";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bienvenido a Exchange</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">

          <Container textAlign='center'>
            <MainForm />
          </Container>
          {/* <FormView /> */}
        </div>
      </div>
    );
  }
}

export default App;
