import React, { Component } from "react";
import "./home.css";
import Auth from "../../services/auth.service";
import Search from "../../components/Search/Search";
import { GlobalContext } from "../../plugins/globalContext";
import { w3cwebsocket as W3CWebSocket } from "websocket";

class Home extends Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props);
    this.Auth = new Auth();
    this.state = { persons: [] };
    this.user = context.find((store) => store?.authUser)?.authUser;
    this.onChatInit = this.onChatInit.bind(this);
    console.log("LoggedIN ", this.user);
    if(this.user) {
      const client = new W3CWebSocket('ws://127.0.0.1:8000');

      client.onopen = function() {
        console.log("ok")
      };
      client.onmessage  = function(message) {
        console.log(message)
      };
    }
  }
  componentDidMount() {
    this.UserList();
  }
  async UserList() {
    const result = await this.Auth.getAllUsers();
    this.setState({ persons: result.data });
  }
  onChatInit(user) {
    this.props.history.push({
      pathname: "/Chat",
      data: user, // your data array of objects
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <section className="section">
            <Search />
          </section>
        </div>
        <div className="columns is-desktop is-multiline p-2 m-4">
          <GridLayout users={this.state.persons} onChatInit={this.onChatInit} />
        </div>
      </div>
    );
  }
}

function GridLayout(props) {
  function onChat(user) {
    props.onChatInit(user);
  }
  return props.users.map((user, i) => {
    return (
      <div className="column is-2" key={i}>
        <UserCard user={user} onChatSelect={onChat} />
      </div>
    );
  });
}
function UserCard(data) {
  function onChatUser() {
    localStorage.removeItem("chatUser");
    data.onChatSelect(data.user);
  }
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-square">
          <img
            src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/iri_girl_face-512.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-6">{data.user.username}</p>
            <p className="subtitle is-7">{data.user.email.id}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            <span className="icon">
              <i className="fas fa-eye"></i>
            </span>
          </span>
        </p>
        <p className="card-footer-item">
          <span className="icon" onClick={onChatUser}>
            <i className="fas fa-comments"></i>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
