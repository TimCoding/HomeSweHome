import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

const ShelterInfo = (props) => {
 return (
   <div>
     <Container>
       <Row>
         <Col md="auto">
           <img className="rounded-circle" width="200" height="200" src={"/../static/img/dog1.jpg"}/>
         </Col>
         <Col>
           <h1>SHELTER DETAILS PAGE</h1>
           <span class="text-muted">Address: </span>
           <br/>
           <span class="text-muted">Phone: </span>
           <br/>
           <span class="text-muted">Yelp Rating: </span>
         </Col>
       </Row>
     </Container>
     <br/>
   </div>
 );
};

export default ShelterInfo;

window._ShelterInfo = ShelterInfo;
