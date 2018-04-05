import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import * as urls from './urls.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ShelterContact = (props) => {
 return (
   <div>
     <Container>
       <Row>
         <Col md="auto">
           <img className="rounded-circle" width="200" height="200" src={props.shelterJSON.image_urls.length > 0 ? props.shelterJSON.image_urls[0] : "/static/img/homeswehomelogo.svg"}/>
         </Col>
         <Col>
           <h1 className="shelterName">{props.shelterJSON.name}</h1>
           <span className="text-muted">Address:
              <span className="shelterAddress"> {props.shelterJSON.address != null ?
              props.shelterJSON.address : props.shelterJSON.city +", "+ props.shelterJSON.state}
              </span>
           </span>
           <br/>
           <span className="text-muted">Phone:
              <span className="shelterPhone"> {props.shelterJSON.phone}</span>
           </span>
           <br/>
             <a href={urls.petfinderShelterURL(props.shelterJSON.id)}
                className="btn btn-outline-primary"><FontAwesomeIcon icon="paw"/> Visit this shelter on PetFinder!</a>
           {/*<span className="text-muted">Yelp Rating: </span>*/}
         </Col>
       </Row>
     </Container>
     <br/>
   </div>
 );
};

export default ShelterContact;

window._ShelterContact = ShelterContact;
