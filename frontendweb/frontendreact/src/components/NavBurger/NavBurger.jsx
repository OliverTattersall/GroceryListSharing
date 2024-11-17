import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../api/api';
import { UserContext } from '../../App';

const StyledLink = styled(Link)`
  font-size: 1.25em;
  color: black;
  &:hover{
    background-color: rgba(203, 194, 194, 0.648);
  }
`;


export const NavBurger = () => {
    const [expand, updateExpand] = useState(false); 
    const user = useContext(UserContext);

    const handleLogout = () => {
      user.updateCurrentUser(null);
      logout();
    }

    return (
      <div style={{position: 'absolute'}}>
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Navigate
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <StyledLink to="/">Home</StyledLink>
                  <StyledLink to="/profile">Profile</StyledLink>
                  <StyledLink to="/login" onClick={handleLogout}>Sign out</StyledLink>
                  <StyledLink to="/test">Test</StyledLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        </div>
    )

}
