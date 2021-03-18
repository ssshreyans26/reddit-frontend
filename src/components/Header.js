import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default function Header() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <LinkContainer to="/">
  <Navbar.Brand>App Name</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <LinkContainer to="/">
      <Nav.Link>Dashboard</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/createpost">
      <Nav.Link>Create Post</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/singlepost">
      <Nav.Link>Single Post</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/glogin">
      <Nav.Link className="ml-auto"></Nav.Link>
      </LinkContainer>
      <LinkContainer to="/leaderboard">
      <Nav.Link className="ml-auto">LeaderBoard</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}
