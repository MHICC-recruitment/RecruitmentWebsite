import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {accueil} from './accueil';
import {etudescliniques} from './etudescliniques';
import {apropos} from './apropos';
import {questionnairepreliminaire} from './questionnairepreliminaire';
import {NoMatch} from './NoMatch';
import {Layout} from './Components/Layout';
import {NavigationBar} from './Components/NavigationBar';
<<<<<<< HEAD
import {faq} from './faq';
=======
import {Jumbotron} from './Components/Jumbotron';
>>>>>>> 4bf276a34efca4f84004746733324f3e9a7515d2

class App extends Component{
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Jumbotron/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={accueil} />
              <Route path="/etudescliniques" component={etudescliniques} />
              <Route path="/questionnairepreliminaire" component={questionnairepreliminaire} />
              <Route path="/apropos" component={apropos} />
              <Route path="/faq" component={faq} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}
export default App;
