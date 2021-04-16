import React from "react";
import axios from "axios";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      rememberMe: null,
    };
  }

  saveCookie(newState) {
    if (newState.rememberMe === 'true') {
      document.cookie = "username=''"+newState.username+"'password=''"+newState.password+"''";
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

  ajaxLogin(state) {
    var loginJSON = {json:'{username:"'+state.username+'";password:"'+state.password+'";rememberMe:'+state.rememberMe+'";}'};
    console.log("POST to http://localhost:8080/signIn payload: ", loginJSON);
    axios.post('http://localhost:8080/signIn', loginJSON, {timeout: 2})
      .then((response) => this.ajaxResponse(response))
      .catch((error) => this.ajaxError(error));
  }

  ajaxError(error) {
    console.log("Error code: "+error.code);
    console.log("Error message: "+error.message);
    console.log("Error stack: "+error.stack);
  }

  ajaxResponse(response) {
    // Get App to pass in a function through the constructor (callback, to declare done) (raising state) !
    console.log("Response: "+response);
  }

  signIn() {
    var newState = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      rememberMe: document.getElementById("rememberMe").checked,
    };
    this.setState(newState);  // This is asynchronus - does it even need to be done?

    var validateMessage = this.validate(newState);
    if (validateMessage.length === 0) {
      // Submit via JSON/AJAX
      // How to notify App that the user has logged in?
    } else {
      alert(validateMessage);
      return;
    }
    console.log("About to attempt ajax...");
    this.ajaxLogin(newState);
    this.saveCookie(newState);
  }

  render() {
    return (
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="password" current-password/>
        <label htmlFor="rememberMe">Remember me?</label>
        <input type="checkbox" id="rememberMe" />
        <button id="signin" onClick={() => this.signIn()}>Sign in</button>
      </form>);
  }
}

export default Signin;
