import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { accueil } from "./pages/accueil";
import { fonctionnement } from "./pages/fonctionnement";
import { etudescliniques } from "./pages/etudescliniques";
import { apropos } from "./pages/apropos";
import { questionnairepreliminaire } from "./pages/questionnairepreliminaire";
import { NoMatch } from "./pages/NoMatch";
import { Layout } from "./Components/Layout";
import { NavigationBar } from "./Components/NavigationBar";
import {Footer} from './Components/Footer';
import { faq } from "./pages/faq";
import styles from "./App.css";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout  className = {styles["App-container"]}>
          <Router>
            <Switch>
              <Route exact path="/" component={accueil} />
              <Route path="/etudescliniques" component={etudescliniques} />
              <Route
                path="/questionnairepreliminaire"
                component={questionnairepreliminaire}
              />
              <Route path="/apropos" component={apropos} />
              <Route path="/fonctionnement" component={fonctionnement} />
              <Route path="/faq" component={faq} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
        <Footer class = 'fixed-bottom'/>
      </React.Fragment>
    );
  }
}
export default App;
