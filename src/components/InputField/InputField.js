/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import "./InputField.css";
class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", valid: 0 };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const payload = {
      value: event.target.value,
      valid: this.validate(event.target),
      required: this.props.required === "false" ? false : true,
    };
    this.setState(payload);
    this.props.childChange(payload);
  }

  validate(field) {
    if (field.type === "text" && field.id !== "id") {
      //check for minimum length
      const validMinValue = field.min
        ? field.value.length > parseInt(field.min)
        : true;
      //check for maximum length
      const validMaxValue = field.max
        ? field.value.length < parseInt(field.max)
        : true;

      return validMinValue && validMaxValue ? 1 : 2;
    }

    if (field.type === "text" && field.id === "id") {
      return field.value.length ? 1 : 2;
    }

    if (field.type === "password") {
      //check for minimum length
      const validMinValue = field.min
        ? field.value.length > parseInt(field.min)
        : 0;
      //check for maximum length
      const validMaxValue = field.max
        ? field.value.length < parseInt(field.max)
        : 50;

      return validMinValue && validMaxValue ? 1 : 2;
    }

    if (field.type === "email") {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(field.value) ? 1 : 2;
    }
    if (field.type === "date") {
      const age = this.getAge(field.value);
      return field.value && age >= 18 ? 1 : 2;
    }
  }
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  leftIcon() {
    if (this.props.leftIcon) {
      return (
        <span className="icon is-small is-left">
          <i className={`fas ${this.props.leftIcon}`}></i>
        </span>
      );
    }
  }
  render() {
    return (
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${this.props.class} ${
              this.state.valid === 2
                ? "is-danger"
                : this.state.valid === 1
                ? "is-success"
                : ""
            }`}
            id={this.props.id}
            value={this.state.value}
            min={this.props.min}
            max={this.props.max}
            onChange={this.handleChange}
            type={this.props.type}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled | false}
            required={this.props.required === "false" ? false : true}
          />

          {this.leftIcon()}

          <span
            className={`icon is-small is-right ${
              this.state.valid === 2
                ? "has-text-danger"
                : this.state.valid === 1
                ? "has-text-success"
                : ""
            }`}
          >
            <i className={`fas fa-check`}></i>
          </span>
        </div>
        <p className="help">{this.props.hint ? `*${this.props.hint}` : ``}</p>
      </div>
    );
  }
}
export default InputField;
