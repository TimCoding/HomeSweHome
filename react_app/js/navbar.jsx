import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  input,
  button} from 'reactstrap';
import * as urls from './urls.js';


export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="form-inline ml-auto bg-light" light color="faded" expand="md">
          <NavbarBrand href="/"><img src="/static/img/homeswehomelogo.png" width="30" height="30"/>HomeSweHome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href={urls.dogsURL()}>Dogs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={urls.parksURL()}>Parks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={urls.sheltersURL()}>Shelters</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={urls.aboutURL()}>About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        <form action="/search/">
          <input type="text" value={this.state.value} name="query"/>
          <input type="submit" value="Search" />
        </form>
        </Navbar>
        <footer className="footer">
          <div className="container text-center">
            <span className="text-muted">&copy; 2018 - HomeSweHome <i className="fas fa-paw"></i></span>
          </div>
        </footer>
      </div>
    );
  }
}

window._NavBar = NavBar
