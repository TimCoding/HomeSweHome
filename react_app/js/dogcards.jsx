import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const DogCard = (props) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    {/* don't know if these props work properly need data to test */}
                    <CardTitle>Dog Name{/*this.props.name*/}</CardTitle>
                    <CardText>
                        <li>breed {/*this.props.breed*/}</li>
                        <li>gender {/*this.props.gender*/}</li>
                        <li>age {/*this.props.age*/}</li>
                    </CardText>
                    <Button>Meet (Insert Dog Name here) {/*this.props.name*/}</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default DogCard;

window._DogCard = DogCard