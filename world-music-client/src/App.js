import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Mapbox from './Mapbox';
import Home from './Home';
import Logo from './images/globe-beats-green.png';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">
            <div className="Logo">
              <img src={Logo} width="64" alt="" />
            </div>
          </Link>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Mapbox} />
        </div>
      </Router>
    );
  }
}

export default App;