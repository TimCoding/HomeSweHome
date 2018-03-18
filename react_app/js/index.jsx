import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './navbar.jsx'
import './carousel.jsx'
// import './splash.jsx'
import './splash.jsx'
import './modelpage.jsx'
import './dogcards.jsx'
import './dogdetails.jsx'
import './infocard.jsx'


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
window._App = App;


class Lmao extends Component {
    render() {
        return (
            <div className="Lmao">
                <h1>aiosdjfoaijsdjfoiajsodf {this.props.text}</h1>
            </div>
        );
    }
}

window._Lmao = Lmao;



// Only need to have this once, here. Uses closures
window.dom_render = function(component, props) {
    ReactDOM.render(React.createElement(component, props), document.getElementById("content"))
};

export default App;
