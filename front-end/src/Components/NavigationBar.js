import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import MHICC from "../assets/mhicc_fr.jpg";
import "../App.css"; //pour pouvoir ajouter les couleurs déterminées pour toute l'app

var Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand {
    color: blue;
  }
  .navbar-nav .nav-link {
    color: blueviolet;
    &:hover {
      background-color: pink;
      color: red;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar sticky="top" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={MHICC}
          width="417"
          height="93"
          className="d-inline-block align-top"
          alt="MHICC logo"
        />{" "}
        Tel : 514-461-1300
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" variant="tabs">
          <Nav.Item>
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/apropos">À propos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/fonctionnement">Fonctionnement</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/etudescliniques">Études cliniques</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/faq">FAQ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Button href="/questionnairepreliminaire">
              Questionnaire préliminaire
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
