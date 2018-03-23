import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export class PawSpinner extends Component {
    render() {
        return (
            <FontAwesomeIcon className="text-primary" icon="paw" spin/>
        )
    }
}