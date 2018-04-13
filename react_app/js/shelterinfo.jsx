import React, { Component } from 'react';
import { Card,
         CardBody,
         CardTitle } from 'reactstrap';

const ShelterInfo = (props) => {
 return (
   <div>
     <Card>
       <CardBody>
         {/* <CardTitle>Customer Reviews</CardTitle> */}
         <CardTitle>About Us</CardTitle>
         <span><b>Adoption Policy: </b>{props.desc.adoption_policy == null ? "N/A" : ""}</span><div className="shelterAdoptionPolicy" dangerouslySetInnerHTML={{__html: props.desc.adoption_policy}}></div>
           <br/>
         <span><b>Mission: </b>{props.desc.adoption_policy == null ? "N/A" : ""}</span> <div className="shelterMission"dangerouslySetInnerHTML={{__html: props.desc.mission}}></div>
           <br/>
         <span><b>Email:</b></span> <div className="shelterEmail">{props.desc.email == null ? "N/A" : props.desc.email}</div>
         {/* <span>review goes here</span><br/> */}
       </CardBody>
     </Card>
   </div>
 );
};

export default ShelterInfo;

window._ShelterInfo = ShelterInfo
