import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

// For each top-level component (ie. DogPage, About, etc)
window.App = App;


// Only need to have this once, here. Uses closures
window.render = function(component) {
    ReactDOM.render(React.createElement(component), document.getElementById("content"))
};

export default App;
