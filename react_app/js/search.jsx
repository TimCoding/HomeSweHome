import React from 'react';
import {Container, Row, Col} from 'reactstrap';

class Search extends React.Component {
  constructor(props) {
  {
    super(props);
    this.state = {
        dogsJSON: null,
        error: null,
        sheltersJSON: null,
        parksJSON: null
    }}
  }

  componentDidMount() {
    //do api calls here
  }

  render() {
    <div>
      <h1> Dog Results </h1>
      <Row>
      </Row>
      <h1> Shelter Results </h1>
      <Row>
      </Row>
      <h1> Park Results </h1>
      <Row>
      </Row>
    </div>
  }
}

window._Search = Search