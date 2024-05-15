/**
 * @module ui/AppLayout
 * @description The layout component for the application.
 */
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom/dist";
import Logout from "../features/auth/Logout";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";

/**
 * AppLayout is the layout component for the application.
 * @returns {JSX.Element} - The layout of the application.
 */
export default function AppLayout() {
  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>CodeCount</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/earnings">
                Earnings
              </Nav.Link>
              <NavDropdown title="Welcome" id="nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Logout} />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
