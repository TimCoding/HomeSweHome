import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const DogCard = (props) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" /*{this.props.image}*/ alt="Card image cap" />
                <CardBody>
                    {/* don't know if these props work properly need data to test */}
                    <CardTitle>Park Name{/*this.props.name*/}</CardTitle>
                    <CardText>
												<ul class="fa-ul">
		                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>breed {/*this.props.breed*/}</li>
		                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>gender {/*this.props.gender*/}</li>
		                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>age {/*this.props.age*/}</li>
												</ul>
                    </CardText>
                    <Button>Meet (Insert Dog Name here) {/*this.props.name*/}</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default DogCard;

window._DogCard = DogCard
