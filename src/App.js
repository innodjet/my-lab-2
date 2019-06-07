import React, {Component} from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Content from './components/Content';
import About from './components/about/About';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav></Nav> 
          <Switch>
            <Route exact path="/" component={ Content } />
            <Route exact path="/About" component={ About } />
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
