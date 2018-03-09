import React from 'react';
import { Container, Row, Col } from 'reactstrap';

//This component is used for the descriptino box in Models pages
//The descriptinon, "text", as well as the quote, "quote", should be passed in as props
export default class DescriptionBox extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <Row>
          <Col>{this.props.text}</Col>
        </Row>
      </Container>
    );
  }
}

window._Description = Description

// export default App;