/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Login.css";
import InputField from "../../components/InputField/InputField";
import Modal from "../../components/Modal/Modal";
import Alert from "../../components/Alert/Alert";
import Auth from "../../services/auth.service";
import { GlobalContext } from "../../plugins/globalContext";
import { useHistory } from "react-router-dom";

class Login extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valid: 0,
      validForm: false,
      modalState: false,
      alertState: false,
    };
    this.form = {
      id: { required: true },
      password: { required: true },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth = new Auth();

    if (props.location.search) {
      this.state.alertState = true;
      this.alertTitle = `We would like you to login before accessing the confidential information. Thank you!`;
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    });
  }

  toggleAlert(e) {
    this.setState((prev, props) => {
      const newState = !prev.alertState;
      return { alertState: e | newState };
    });
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
      valid: event.target.value.length > 5 ? 1 : 2,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    let payload = {};
    for (const [key, value] of Object.entries(this.form)) {
      payload[key] = value.value;
    }
    try {
      await this.auth.authenticateUser(payload);
      const { data: authUser } = await this.auth.getUser();
      const [state, setState] = this.context;
      setState((previoustate) => ({ ...previoustate, authUser }));
      this.toggleAlert();
      if (authUser.active) {
        this.props.history.push("/");
      } else {
        this.props.history.push("/profile");
      }
    } catch (err) {
      this.alertTitle = err.response
        ? err.response.data
        : "There is something wrong!";
      this.toggleAlert(true);
    }
  }
  handleChildChange(e, type) {
    this.form[type] = e;
    this.validateForm();
  }
  validateForm() {
    // check if form is valid
    const fields = Object.keys(this.form).filter(
      (prop) => this.form[prop].required && this.form[prop].valid === 1
    );
    const requiredfields = Object.keys(this.form).filter(
      (prop) => this.form[prop].required
    );

    this.setState({
      validForm: fields.length >= requiredfields.length ? true : false,
    });
  }

  render() {
    return (
      <div className="container ">
        <Alert
          closeAlert={this.toggleAlert}
          alertState={this.state.alertState}
          title={this.alertTitle}
          alertClass="is-primary is-light m-4"
        ></Alert>
        <div className="card p-2  m-4 ">
          <p className="level-item has-text-centered is-size-3-desktop is-size-5-mobile">
            Login
          </p>
          <form onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              class="is-hovered"
              id="id"
              min="3"
              max="10"
              placeholder="username | email | phone"
              leftIcon="fa-user"
              childChange={(e) => this.handleChildChange(e, "id")}
            />

            <InputField
              type="password"
              class="is-hovered"
              id="password"
              min="6"
              placeholder="password"
              leftIcon="fa-key"
              childChange={(e) => this.handleChildChange(e, "password")}
            />

            <div className="field is-grouped is-justify-content-center mt-3 ">
              <div className="control">
                <button
                  className="button is-link"
                  disabled={!this.state.validForm}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>
          </form>
        </div>

        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title={this.modalTitle}
        >
          <h3>
            This {this.key}
            <strong>{this.val}</strong> is already have an account with us.
          </h3>
          <h3>Please login using your {this.key} </h3>
          <div className="field is-grouped is-justify-content-center mt-3 ">
            <div className="control">
              <button className="button is-link">Log in</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;
