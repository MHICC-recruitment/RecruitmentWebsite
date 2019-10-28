import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import MHICC from "../assets/mhicc_fr.jpg";
import styles from "../App.module.css";

export const NavigationBar = () => (
  <div className={styles["Navigation-bar"]}>
    Tel : 514-461-1300
    <Navbar expand="lg" sticky="top">
      <Navbar.Brand href="/">
        <div className={styles["Navigation-Logo"]}>
          <img src={MHICC} className="d-inline-block align-top" />
        </div>
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
  </div>
);
