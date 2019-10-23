import React from 'react';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import waves from '../assets/waves.png';

const Styles = styled.div`
    .Jumbo{
        background: url(${waves}) no-repeat fixed bottom;
        background-size: cover;
        color: #ccc;
        height: 150px;
        position: relative;
        z-index: -2;
    }
    .overlay{
        background-color: #000;
        opacity: 0.6;
        position: absolute:
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className = "Jumbo">
            <div className = "overlay"></div>
            <Container>
                <hi>MHICC</hi>
                <p>Centre de Coordination des Essais Cliniques de Montréal</p>
            </Container>
        </Jumbo>
    </Styles>

)