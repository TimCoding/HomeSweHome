import React, { Component } from 'react';
import { ControlledCarousel } from './carousel.jsx'
import { NavBar } from './navbar.jsx';
import DogCard from './dogcards';
import ShelterCard from './sheltercards'
import { CardDeck } from 'reactstrap';


// const items = [
//   {
//     src: "/../static/img/dog1.jpg",
//     altText: 'Slide 1',
//     caption: 'Slide 1'
//   },
//   {
//     src: "/../static/img/dog2.jpg",
//     altText: 'Slide 2',
//     caption: 'Slide 2'
//   },
//   {
//     src: "/../static/img/dog3.jpg",
//     altText: 'Slide 3',
//     caption: 'Slide 3'
//   }
// ];

// const format = "w-75 mx-auto"

export class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <ControlledCarousel/>
        <CardDeck>
          <DogCard/>
        </CardDeck>
        <CardDeck>
          <ShelterCard/>
        </CardDeck>

           
      </div>
    );
  }
}

window._Splash = Splash
