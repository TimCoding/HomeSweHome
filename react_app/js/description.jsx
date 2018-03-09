import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Description extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <Row>
          <Col>{this.props.text}</Col>
        </Row>
      <Container>
    );
  }
}

export default App;