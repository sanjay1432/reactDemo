import React, { Component, useContext } from "react";
import "./Profile.css";
import { GlobalContext } from "../../plugins/globalContext";
import Auth from "../../services/auth.service";
class Profile extends Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props);
    this.auth = new Auth();
    this.user = context.find((store) => store.authUser).authUser;
    console.log(this.user);
    this.state = {
      url: this.user.picture
        ? `${process.env.REACT_APP_ROOT_URL}images/${this.user.picture}`
        : "https://bulma.io/images/placeholders/600x480.png",
      file: null,
      fileToggled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  handleChange(event) {
    this.setState({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
      fileToggled: true,
    });
  }

  onCancel() {
    this.setState({
      file: "https://bulma.io/images/placeholders/600x480.png",
      fileToggled: false,
    });
  }
  onUpload() {
    console.log(this.state);
    const data = new FormData();
    const imagedata = this.state.file;
    data.append("file", imagedata);
    this.auth.uploadProfile(data);
  }

  render() {
    return (
      <div className="container ">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="card   m-4">
              <div className="card-image">
                <figure className="image is-square">
                  <img src={this.state.url} alt="Placeholder" />
                </figure>
                <div className="field is-grouped is-justify-content-space-between">
                  <div className="file is-primary">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="resume"
                        onChange={this.handleChange}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Select Photo</span>
                      </span>
                    </label>
                  </div>
                  <UploadButton
                    file={this.state}
                    onCancel={this.onCancel}
                    onUpload={this.onUpload}
                  />
                </div>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{this.user.username}</p>
                    <p className="subtitle is-6">{this.user.email}</p>
                  </div>
                </div>

                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function UploadButton(props) {
  const file = props.file;
  console.log(file);
  function onCancel() {
    props.onCancel();
  }
  function onUpload() {
    props.onUpload();
  }
  if (file.fileToggled) {
    return (
      <div className="buttons">
        <button className="button is-danger" onClick={onCancel}>
          Cancel
        </button>
        <button className="button is-success" onClick={onUpload}>
          Upload
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Profile;
