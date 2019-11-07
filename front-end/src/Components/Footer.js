import React from "react";
import styles from './Footer.css';
import MHICC from "../assets/mhicc_fr.jpg";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => (
    <div className = "footer-container">
        <div className = "container">
            <div className = "row">
                {/* Column 1 - info*/}
                <div className = "col-md-3 col-sm-6 align-item-center inlined">
                    <h4>MHICC</h4>
                    <u1 className = "list-unstyled">
                        <li>Montreal Health Innovations Coordinating Center</li>
                        <li><FaPhoneVolume/>4100 Molson St., Suite 400</li>
                        <li>Montreal, Quebec H1Y 3N1</li>
                        <li><MdEmail/>Tel: 514-461-1300</li>
                    </u1>
                </div>
                {/* Maps */}
                <div className = "col-xs-1 col-xs-3 justify-content-between">
                    Mettre la Map
                </div>
                {/* Column 2 - Links*/}
                <div className = "col-md-3 col-sm-6 align-item-center">
                    <h4>Pages</h4>
                    <u1 className = "list-unstyled">
                        <li> <a href="/apropos">About us</a></li>
                        <li> <a href="/questionnairepreliminaire">Survey</a></li>
                        <li> <a href="/etudescliniques">Clinical studies</a></li>
                        <li> <a href="/faq">FAQ</a></li>
                        <li> <a href="/apropos">Join us</a></li> {/* Est ce que on veux mettre un lien vers courriel? */}
                    </u1>
                </div>
                {/* Logo*/}
                <div className = "col-xs-1 col-xs-3 justify-content-between">
                    <div className = {styles["footer-logo"]}>
                        <img src={MHICC} />
                    </div>
                </div>
            </div>
            {/*Footer Bottom*/}
            <div className = "footer-bottom">
                <p className = "text-xs-center">
                    &copy;{new Date().getFullYear()} MHICC - All Rights Reserved
                </p> 
            </div>
        </div>
    </div>
);
