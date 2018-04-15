import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col } from 'reactstrap';

export class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: props.open
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.name}
        </DropdownToggle>
        <DropdownMenu className="dropdown-scroll">
          <Col>
            {this.props.options}
          </Col>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

window._Sort = Sort
