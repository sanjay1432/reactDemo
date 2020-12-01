import React, { Component } from "react";
import { GlobalContext } from "../../plugins/globalContext";
import "./Chat.css";
import Ws from "../../services/ws.service"
class Chat extends Component {
  static contextType = GlobalContext;
  
  constructor(props, context) {
    super(props);
    this.wss = new Ws()
    this.state = { message: "", msgList: []};
    this.sendMessage = this.sendMessage.bind(this);
    this.user = context.find((store) => store?.authUser).authUser;
    console.log(this.user);
    this.handleChange = this.handleChange.bind(this);
    this.reciever = this.handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    const { data } = props.location;
    this.reciever = data ? data : JSON.parse(localStorage.getItem("reciever"));
   
    localStorage.setItem("reciever", JSON.stringify(this.reciever));

  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.sendMessage()
    }
  }
  sendMessage() {
    this.setState({
      msgList: [
        ...this.state.msgList,
        {
          message: this.state.message,
          by: "sender",
        },
      ]
    });
    this.setState({
     message: ''
    });
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const num = Math.round(Math.random());
      if (num === 1)
        this.setState({
          msgList: [
            ...this.state.msgList,
            {
              message: "Another journey chamber way yet females man",
              by: "receiver",
            },
          ],
        });
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }, 2000);
     const roomId = `${this.user.username}${this.reciever.username}`
     this.wss.sendMsg(roomId, this.state.message)
  }
  render() {
  
    return (
      <div className="container">
        <div className="card  p-2  m-4">
          <p className="card-header-title">
            {this.user.username} is chatting with {this.reciever?.username}
          </p>

          <div className="card-content chat-content">
            <ChatList messagesprop={this.state.msgList} />
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
          </div>
          <div className="field-body ">
            <input
              className="input is-rounded"
              name="message"
              type="text"
              // defaultValue={this.state.message}
              value = {this.state.message}
              placeholder="Start Typing here ..."
              onChange={this.handleChange}
              onKeyDown={this._handleKeyDown}
            />
            <span className="icon is-large">
              <span className="fa-stack fa-lg" onClick={this.sendMessage}>
                <i className="fas  fa-arrow-circle-right fa-stack-2x has-text-success"></i>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
function ChatList(list) {
  return list.messagesprop.map((message, i) => {
    if (message.by === "sender") {
      return (
        <div key={i}>
          <div className="columns">
            <div className="notification is-light column is-three-fifths">
              <h2 className="subtitle">{message.message}</h2>
            </div>
          </div>
          <br />
        </div>
      );
    } else {
      return (
        <div key={i}>
          <div className="columns">
          <div className="notification is-dark column is-6 is-offset-6">
              <h2 className="subtitle">{message.message}</h2>
            </div>
          </div>
          <br />
        </div>
      );
    }
  });
}

export default Chat;
