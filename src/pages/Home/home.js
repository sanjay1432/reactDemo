import React, { Component } from "react";
import logo from "../../logo.svg";
import "./home.css";
import Auth from "../../services/auth.service";
import Search from "../../components/Search/Search";
import { GlobalContext } from "../../plugins/globalContext";
class Home extends Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props);
    this.Auth = new Auth();
    this.state = { persons: [] };
    this.user = context.find((store) => store.authUser).authUser;
    console.log("LoggedIN ", this.user);
  }
  componentDidMount() {
    this.UserList();
  }
  async UserList() {
    const result = await this.Auth.getAllUsers();
    this.setState({ persons: result.data });
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
          <GridLayout users={this.state.persons} />
        </div>
      </div>
    );
  }
}

function GridLayout(props) {
  console.log(props);
  return props.users.map((user, i) => {
    return (
      <div className="column is-2" key={i}>
        <UserCard user={user} />
      </div>
    );
  });
}
function UserCard(data) {
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
            <p className="title is-6">{data.user.name}</p>
            <p className="subtitle is-6">@johnsmith</p>
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
          <span className="icon">
            <i className="fas fa-comments"></i>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
