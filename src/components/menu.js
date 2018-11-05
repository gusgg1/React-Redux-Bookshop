"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends React.Component {
  render() {
    return(
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Nav>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href='/about'>About</NavItem>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/admin'>
              <NavItem eventKey={1}>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <NavItem eventKey={2}>
                Your Cart
                { 
                  this.props.cartItemsNumber > 0 ? 
                    <Badge className='badge'>{this.props.cartItemsNumber}</Badge> 
                    : 
                    null 
                }
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;