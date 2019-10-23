import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
    .navbar-brand, .navbar-nav .nav-link {
        color: #d9e3f0;

        &:hover {
            color: #d9e3f0;
        }
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">514–461–1300</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id = "basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/">Accueil</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/etudescliniques">Études cliniques</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/apropos">À propos</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/faq">FAQ</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/questionnairepreliminaire">Questionnaire préliminaire</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)