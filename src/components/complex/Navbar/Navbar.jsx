import React from "react";

import { routes } from "router";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";

import styles from "./navbar.module.scss";
import "./navbar.scss";

const NavBar = () => {
  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className={styles.navbarBrand} as={NavLink} to="/">
          <div className={styles.navbarTitleWrapper}>
            <span className={styles.navbarTitle}>
              <i className="wi wi-day-storm-showers" /> Yawa
            </span>
            <Badge pill bg="info" className={styles.navbarBadge}>
              Yet Another Weather App
            </Badge>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav mr-auto me-auto">
            <li className="nav-item">
              <NavLink className={navLinkClass} to={routes.forecastScreen}>
                Forecast
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to={routes.mapScreen}>
                Weather map
              </NavLink>
            </li>
          </ul>

          <Nav>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                className={(isActive) => `${isActive ? "active" : ""}`}
                to={routes.settingsScreen}
              >
                <i className="fas fa-user" />

                <span className={styles.settingsNavItem}>My settings</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
