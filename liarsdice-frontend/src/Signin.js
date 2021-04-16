import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      rememberMe: null,
    }
  }

  validate(state) {
    var message = "";
    if (state.username.length <= 0) {
      message += "We require a username to sign you in.\n";
    }
    if (state.password.length <= 0) {
      message += "We require a password to sign you in.\n";
    }
    return message;
  }

  signIn() {
    var newState = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      rememberMe: document.getElementById("rememberMe").checked,
    };
    this.setState(newState);  // This is asynchronus - does it even need to be done?

    var validateMessage = this.validate(newState);
    if (validateMessage.length == 0) {
      // Submit via JSON/AJAX
      // How to notify App that the user has logged in?
    } else {
      alert(validateMessage);
      return;
    }
  }

  render() {
    return (
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="username" />
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="password" />
        <label for="rememberMe">Remember me?</label>
        <input type="checkbox" id="rememberMe" />
        <button id="signin" onClick={() => this.signIn()}>Sign in</button>
      </form>);
  }
}

export default Signin;
