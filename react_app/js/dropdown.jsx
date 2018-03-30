import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Filter extends React.Component {
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
          Filter
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>City</DropdownItem>
          <DropdownItem>Zip</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

window._Filter = Filter
