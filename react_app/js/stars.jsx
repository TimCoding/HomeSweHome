import React, {Component, Fragment} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export class StarsRating extends Component {

    render() {
        let stars = Math.round(this.props.rating * 2);
        let fullFilledStars = Math.floor(stars / 2);
        let halfStar = stars % 2 === 1;
        let fullEmptyStars = Math.floor((10 - stars) / 2);
        let icons = [];
        for (let i = 0; i < fullFilledStars; i++) {
            icons.push(
                <FontAwesomeIcon className="text-danger" icon="star"/>
            );
        }
        if (halfStar) {
            icons.push(
                <span className="fa-layers fa-fw">
                    <FontAwesomeIcon className="text-danger" icon="star-half"/>
                    <FontAwesomeIcon className="text-danger" icon={["far", "star-half"]} flip="horizontal"/>
                </span>

            );
        }
        for (let i = 0; i < fullEmptyStars; i++) {
            icons.push(
                <FontAwesomeIcon className="text-danger" icon={["far", "star"]}/>
            );
        }
        return (
            <Fragment>
                {icons}

            </Fragment>
        )
    }
}