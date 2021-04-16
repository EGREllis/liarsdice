import React from "react";
import './App.css';
import Signin from './Signin.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "signin",
    };
  }

  renderPage() {
    switch(this.state.page) {
      case "signin":
        return (<Signin />);
      default:
        return (<Signin />);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.renderPage()}
        </header>
    </div>);
  }
}

export default App;
