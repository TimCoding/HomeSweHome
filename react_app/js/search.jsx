import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PawSpinner} from './spinner.jsx';
import {NavBar} from './navbar.jsx';

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
    
    // if(this.state.dogsJSON == null) {
    //   return (
    //       <div> 
    //           <Container>
    //               <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
    //           </Container>
    //       </div>
    //   );
    // }

    return (
      <div>
         <NavBar/>
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
    );
  }
}

window._Search = Search