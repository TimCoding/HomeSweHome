import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

const ShelterInfo = (props) => {
 return (
   <div>
     <Container>
       <Row>
         <Col md="auto">
           <img className="rounded-circle" width="200" height="200" src={props.shelterJSON.image_urls[0] != 0 ? props.shelterJSON.image_urls[0] : "/static/img/homeswehomelogo.svg"}/>
         </Col>
         <Col>
           <h1>{props.shelterJSON.name}</h1>
           <span className="text-muted">Address: {props.shelterJSON.address != null ? props.shelterJSON.address : props.shelterJSON.city +", "+ props.shelterJSON.state}</span>
           <br/>
           <span className="text-muted">Phone: {props.shelterJSON.phone}</span>
           <br/>
           /*<span className="text-muted">Yelp Rating: </span>*/
         </Col>
       </Row>
     </Container>
     <br/>
   </div>
 );
};

export default ShelterInfo;

window._ShelterInfo = ShelterInfo;
