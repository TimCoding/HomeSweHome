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


export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
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
        <Navbar className="form-inline ml-auto" color="faded" light expand="md">
          <NavbarBrand href="/"><img src="/../static/img/homeswehomelogo.png" width="30" height="30"/>HomeSweHome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/dogs">Dogs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/parks">Parks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/shelters">Shelters</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <FormGroup className="form-inline ml-auto" light expand="md">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </FormGroup>
        </Navbar>

        <footer class="footer">
          <div class="container text-center">
            <span class="text-muted">&copy; 2018 - HomeSweHome <i class="fas fa-paw"></i></span>
          </div>
        </footer>
      </div>
    );
  }
}

window._NavBar = NavBar
