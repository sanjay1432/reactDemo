import React, { Component } from "react";
import logo from "../../logo.svg";
import "./home.css";
import Auth from "../../services/auth.service";
class Home extends Component {
  constructor(props) {
    super(props);
    this.Auth = new Auth();
    this.Auth.getAllUsers();
  }

  users() {
    this.Auth.getAllUsers();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Home;
