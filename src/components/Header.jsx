import React, { useState, useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";
import { CurrentUserContext } from "../context/CurrentUser";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Header() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function getUser() {
    if (Cookies.get("access_token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function handleLogout() {
    axios({
      url: `/api/session`,
      method: `delete`,
    })
      .then(() => {
        setCurrentUser({ uuid: "", username: "" });
        Cookies.remove("access_token");
        Cookies.remove("username");
        Cookies.remove("userID");
      })
      .then(() => {
        navigate("/");
      });
  }

  useEffect(() => {
    getUser();
  }, [currentUser]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <h1 className="m-0 p-0">Traveller App</h1>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {loggedIn ? (
              <LinkContainer to="/dashboard" onClick={() => setExpanded(false)}>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/" onClick={() => setExpanded(false)}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer
              to="/destinations"
              onClick={() => setExpanded(false)}
            >
              <Nav.Link>Destinations</Nav.Link>
            </LinkContainer>
            {loggedIn ? (
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/login" onClick={() => setExpanded(false)}>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/Register"
                  onClick={() => setExpanded(false)}
                >
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
