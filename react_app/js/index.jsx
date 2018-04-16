import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './navbar.jsx'
import './carousel.jsx'
import './splash.jsx'
import './modelpage.jsx'
import './dogdetails.jsx'
import './shelterdetails.jsx'
import './parkdetails.jsx'
import './about.jsx'
import './search.jsx'
import './modelPagination.jsx'
import './dropdown.jsx'
import 'react-select/dist/react-select.css';


// Only need to have this once, here. Uses closures
window.dom_render = function(component, props) {
    ReactDOM.render(React.createElement(component, props), document.getElementById("content"))
};
