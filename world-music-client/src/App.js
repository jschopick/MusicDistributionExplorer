import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mapbox from './Mapbox';
import Home from './Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Mapbox} />
        </div>
      </Router>
    );
  }
}

export default App;