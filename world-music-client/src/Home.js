import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#052810'
    }
  }
});

class Home extends Component {
  render() {
    return (
      <div className="Home Background">
        <h1 className="Glow">WORLD MUSIC</h1>
        <div>
          <Link to="/map">
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" color="primary" size="large" className="Button">
              Go to map
              </Button>
            </MuiThemeProvider>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
