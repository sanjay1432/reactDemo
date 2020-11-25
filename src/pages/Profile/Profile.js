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

    this.state = {
      url: this.user.picture
        ? `${process.env.REACT_APP_ROOT_URL}images/${this.user.picture}`
        : "https://bulma.io/images/placeholders/600x480.png",
      file: null,
      fileToggled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateValue = this.calculateValue.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onVerifyEmail = this.onVerifyEmail.bind(this);
    this.value = this.user.active ? 100 : this.calculateValue(this.user);
  }
  calculateValue(user) {
    let value = 30;
    if (user.email.verified) {
      value += 30;
    }
    if (user.phone.number && user.phone.verified) {
      value += 30;
    }
    if (user.picture) {
      value += 10;
    }
    return value;
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
  async onUpload() {
    console.log(this.state);
    const data = new FormData();
    const imagedata = this.state.file;
    data.append("file", imagedata);
    await this.auth.uploadProfile(data);
    const { data: authUser } = await this.auth.getUser();
    const [state, setState] = this.context;
    setState((previoustate) => ({ ...previoustate, authUser }));
  }
  async onVerifyEmail() {
    console.log(this.user.email);
    await this.auth.verifyEmail({ email: this.user.email });
    alert("Verification mail has been sent to your registerd email!!!");
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
                    <div className="field is-grouped is-justify-content-space-between">
                      <p className="subtitle is-6">
                        {this.user.email.id}
                  
                      </p>
                      <p className="subtitle is-6">
                      <CheckVerification isVerified={this.user.email.verified} />
                      </p>
                      <p className="subtitle is-6">
                        {this.user.phone.number ? (
                          this.user.phone.number
                        ) : (
                          <AddPhone />
                        )} 
                      </p>
                      <p className="subtitle is-6">
                      <CheckVerification isVerified={this.user.phone.verified} />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-one-third ">
            <div className="card  p-2 m-4">
              <p>Profile completeness report</p>
              <progress
                className="progress"
                value={this.value}
                max="100"
              ></progress>

              <p className=" subtitle  is-7">
                To activate your account we need these essential information
                from your end So that we can tailor the results better.
              </p>
              <div className="has-text-weight-light">
                <p className="subtitle has-text-danger is-7">
                  <span>
                    {this.user.email.verified
                      ? ""
                      : "Email Id need to be verified!"}
                  </span>
                </p>
                <p className="subtitle has-text-danger is-7">
                  <span>
                    {this.user.phone.number
                      ? this.user.phone.verified
                        ? ""
                        : "Phone number need to be verified"
                      : "Please add a Phone number"}
                  </span>
                </p>
                <p className="subtitle has-text-danger is-7">
                  <span>
                    {this.user.picture ? "" : "Profile photo is not availabe"}
                  </span>
                </p>

                <p className="subtitle has-text-danger is-7">
                  <span>
                    {this.user.location.coordinates.length > 1
                      ? ""
                      : "Address is not availabe"}
                  </span>
                </p>
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
function AddPhone() {
  return (
    <div>
      <input class="input is-small" type="tel" placeholder="Insert Phone number here"/> 
    </div>
  );
}
function CheckVerification(props) {
  if (props.isVerified) {
    return (
      <span className="icon has-text-success">
        <i className="fas fa-check-square"></i>
      </span>
    );
  } else {
    return (
      <span className="icon has-text-danger">
        <i className="fas fa-exclamation-circle"></i>
      </span>
    );
  }
}

export default Profile;
