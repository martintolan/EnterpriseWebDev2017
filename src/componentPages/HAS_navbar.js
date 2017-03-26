import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-router';


var HomeAutoNavBar = React.createClass({
	getInitialState: function() {
		return { 
			version: '1.0.1', 
			name: 'Home Automation System NavBar'
		};
	},// getInitialState

	render : function() {
		return (
			<div className="view-container">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Dashboard</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="heating">Heating</Link></NavItem>
              <NavItem eventKey={2}><Link to="power">Power</Link></NavItem>
              <NavItem eventKey={3}><Link to="water">Water</Link></NavItem>
              <NavItem eventKey={4}><Link to="lights">Lighting</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={5}><Link to="about">About</Link></NavItem>
              <NavItem eventKey={6}><Link to="contact">Contact</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
		); // return

	} // render

}); // var - HomeAutoNavBar


export default HomeAutoNavBar;