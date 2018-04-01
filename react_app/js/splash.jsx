import React, { Component } from 'react';
import { ControlledCarousel } from './carousel.jsx'
import { NavBar } from './navbar.jsx';


const items = [
  {
    src: "/static/img/dog1.jpg",
  },
  {
    src: "/static/img/dog2.jpg",
  },
  {
    src: "/static/img/dog3.jpg",
  }
];

export class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <ControlledCarousel size={"w-100 mx-auto"} items = {items}/>
      </div>
    );
  }
}

window._Splash = Splash
