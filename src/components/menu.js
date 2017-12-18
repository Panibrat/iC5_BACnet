import React from 'react';
import {Navbar, NavItem, Nav, Badge} from 'react-bootstrap';
import {connect} from 'react-redux';


class Menu extends React.Component{
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">iC5</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/analog">AV</NavItem>
                <NavItem eventKey={2} href="/binary">BV</NavItem>

              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="/admin">Admin</NavItem>
                <NavItem eventKey={2} href="/cart">
                    You Cart <Badge className="badge">77</Badge>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    )
  }
}

export default Menu;
