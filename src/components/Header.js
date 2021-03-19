import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import "../css/header.css";

export default function Header() {
    return (
      <Navbar bg="dark"  className="header"   variant="dark" expand="lg" sticky="top">
            <LinkContainer to="/">
  <Navbar.Brand>Anonymous</Navbar.Brand>
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
      {/* <LinkContainer to="/singlepost">
      <Nav.Link></Nav.Link>
      </LinkContainer> */}
      <LinkContainer to="/leaderboard">
      <Nav.Link className="ml-auto">LeaderBoard</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/profile">
      <Nav.Link className="ml-auto">Profile</Nav.Link>
      </LinkContainer>
      {(localStorage.getItem("uid"))
     ? <LinkContainer to="/glogout">
      <Nav.Link className="ml-auto">Sign Out</Nav.Link>
      </LinkContainer>
    :<LinkContainer to="/glogin">
      <Nav.Link className="ml-auto">Sign In</Nav.Link>
      </LinkContainer>
    }
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}