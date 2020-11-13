/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Signup.css";
import InputField from "../../components/InputField/InputField";
import Modal from "../../components/Modal/Modal";
import Auth from "../../services/auth.service";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", valid: 0, validForm: false, modalState: false };
    this.isValid = false;
    this.mongoErrorkeyValue = null;
    this.formInitiated = false;
    this.form = {
      username: { required: true },
      email: { required: true },
      password: { required: true },
      dob: { required: true },
      phoneNumbers: { required: true },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth = new Auth();

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
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
      const saveduser = await this.auth.saveUser(payload);
    } catch (err) {
      if (err.response.status === 409) {
        let message = err.response.data.split("dup key:");
        const finalString = message[message.length - 1];
        var data = finalString
          .replace("'", "")
          .replace("{", "")
          .replace("}", "")
          .split(":");
        //read Key
        this.key = data[0];
        //Read value
        this.val = data[1];
        this.toggleModal();
      }
    }

    // event.preventDefault();
  }
  handleChildChange(e, type) {
    this.formInitiated = true;
    this.form[type] = e;
    console.log("Form", this.form);
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
        <div className="card p-2  m-4 ">
          <p className="level-item has-text-centered is-size-3-desktop is-size-5-mobile">
            Become a registered user {this.mongoErrorkeyValue}
          </p>
          <form onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              class="is-hovered"
              id="username"
              min="3"
              max="10"
              hint="username must be > 3  & < 10 charcters"
              placeholder="username"
              leftIcon="fa-user"
              childChange={(e) => this.handleChildChange(e, "username")}
            />
            <InputField
              type="email"
              class="is-hovered"
              id="email"
              placeholder="email"
              hint="valid email required!"
              leftIcon="fa-envelope"
              childChange={(e) => this.handleChildChange(e, "email")}
            />
            <InputField
              type="password"
              class="is-hovered"
              id="password"
              min="6"
              hint="password must be greater than 6 charcters "
              placeholder="password"
              leftIcon="fa-key"
              childChange={(e) => this.handleChildChange(e, "password")}
            />
            <div className="field-body ">
              <InputField
                type="date"
                class="is-hovered"
                id="dob"
                hint="dob is required! must be 18+ ! "
                placeholder="DOB"
                childChange={(e) => this.handleChildChange(e, "dob")}
              />
              &nbsp;
              <InputField
                type="text"
                class="is-hovered"
                id="phoneNumbers"
                max="10"
                hint="valid number with country code (+60***) required!"
                placeholder="Phone Number"
                leftIcon="fa-phone"
                childChange={(e) => this.handleChildChange(e, "phoneNumbers")}
              />
            </div>

            {this.mongoErrorkeyValue
              ? Object.keys(this.mongoErrorkeyValue)[0]
              : null}
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
              <a className="button is-link" href="/Login">
                Log in
              </a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Signup;
