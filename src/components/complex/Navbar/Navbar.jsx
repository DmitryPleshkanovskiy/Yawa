import React from "react";

import { routes } from "router";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";

import "./navbar.scss";

const NavBar = () => {
  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand
          style={{ fontSize: 22, display: "flex", alignItems: "center" }}
          as={NavLink}
          to="/"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 5,
              fontFamily: "Lobster, cursive",
            }}
          >
            <span style={{ textAlign: "left", marginLeft: 5 }}>
              <i className="wi wi-day-storm-showers" /> Yawa
            </span>
            <Badge
              pill
              bg="info"
              style={{
                fontSize: 10,
                fontFamily: "Poppins",
                opacity: "0.5",
                lineHeight: "10px",
                // height: "100%",
                // position: "relative",
                // bottom: -10,
              }}
            >
              Yet Another Weather App
            </Badge>
          </div>
        </Navbar.Brand>

        <>
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
              <NavDropdown
                title={"Settings" /* userProfile?.user */}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  className={(isActive) => `${isActive ? "active" : ""}`}
                  to={routes.settingsScreen}
                >
                  <i className="fas fa-user" />
                  <span style={{ marginLeft: 7 }}>My settings</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      </Container>
    </Navbar>
  );
};

export default NavBar;
