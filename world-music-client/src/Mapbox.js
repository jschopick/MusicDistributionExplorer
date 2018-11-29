import React, { Component } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl from 'mapbox-gl';
import request from 'superagent';
import TOKEN from './config/MAPBOX.js';
import './App.css';

mapboxgl.accessToken = TOKEN.key;
const geocodingClient = mbxGeocoding({ accessToken: TOKEN.key});

class Mapbox extends Component {
  // Sets center of page and default zoom
  constructor() {
    super();
    this.state = {
      lng: 6,
      lat: 30,
      zoom: 1.5,
      active: null,
      result: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.toggle = this.toggle.bind(this);
    this.highlight = this.highlight.bind(this);
    this.shadow = this.shadow.bind(this);
  }
  
  // Makes a GET request to the API based on the Genre selected
  handleSubmit(event) {
    request
      .get('http://localhost:8000/api/' + event)
      .then(res => {
        // res.body, res.headers, res.status
        this.setState({ result: res.body });
      })
      .catch(err => {
        // err.message, err.response
        console.log(err.message);
      });
  }

  // Toggles active status on a button upon selection.
  toggle(index) {
    if (this.state.active === index) {
      this.setState({active: null})
    } else {
      this.setState({active: index})
    }
  }

  // Highlights text to whitesmoke when active.
  highlight(index) {
    if (this.state.active === index) {
      return "#f5f5f5";
    }
    return "";
  }

  // Adjusts the shadow for easier readability when active.
  shadow(index) {
    if (this.state.active === index) {
      return "0 0 20px #A3DBB4, 0 0 30px #A3DBB4, 0 0 40px #A3DBB4, 0 0 50px #A3DBB4, 0 0 60px #A3DBB4, 0 0 70px #A3DBB4, 0 0 80px #A3DBB4";
    }
    return "";
  }

  // Everything related to the map is in here.
  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    // Initialize map.
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    });

    // Search bar by location.
    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });
    map.addControl(geocoder);

    // Search by country: sets state to the location entered in.
    geocoder.on('result', function(ev) {
      let loc = checkValidLocation(() => ev.result.place_name);
      if(loc != null) {
        request
        .get('http://localhost:8000/api/topgenres')
        .then(res => {
          // res.body, res.headers, res.status
          for(let i = 0; i < res.body.length; i++) {
            if(loc === res.body[i].CountryName) {
              this.setState({ result: res.body[i] });
              break;
            }
          }
        })
        .catch(err => {
          // err.message, err.response
          console.log(err.message);
        });
      }
    }.bind(this));

    // Toggle fullscreen.
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Adds a marker to every valid location in the result set.
    let markers = [];
    map.on('contextmenu', () => {
      // Clears all existing markers before loading new ones.
      while((Array.isArray(markers) && markers.length)) {
        markers[markers.length - 1].remove();
        markers.pop();
      }
      if(this.state.active !== null) {
        // Passes country name to helper function.
        let countryList = this.state.result;
        if(countryList[0] === undefined && countryList.length !== 0) {
          addMarker(countryList);
        } else {
          for(let i = 0; i < countryList.length; i++) {
            addMarker(countryList[i]);
          }
        }
      }
    });
    
    // Gets geolocation from country name and creates a marker at the location.
    function addMarker(country) {
      geocodingClient.forwardGeocode({
        query: country.CountryName,
        limit: 1
      })
      .send()
      .then(response => {
        // Adds a marker at the specified location if it is a valid.
        let geolocation = checkValidLocation(() => response.body.features[0].geometry.coordinates);
        if(geolocation != null) {
          markers.push(new mapboxgl.Marker()
          .setLngLat(geolocation)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + country.CountryName + '</h3><p>Top Genre: ' + country.TopGenre + '</p><p>Followers: ' + country.NumFollowers + '</p>'))
          .addTo(map));
        }
      })
    }

    // Tracks latitude, longitude, and zoom as the user moves around the map.
    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(1),
        lat: lat.toFixed(1),
        zoom: map.getZoom().toFixed(1)
      });
    });

    // Adds country labels in native language underneath English label
    map.on('load', () => {
      let labels = ['country-label-lg', 'country-label-md', 'country-label-sm'];
      labels.forEach(function(layer) {
        map.setLayoutProperty(layer, 'text-field', ['format', ['get', 'name_en'], { 'font-scale': 1.2 }, '\n', {}, ['get', 'name'], {'font-scale': 0.8,'text-font': ['literal', [ 'DIN Offc Pro Italic', 'Arial Unicode MS Regular' ]]}]
        );
      });
    });

    // Checks if a location is valid to avoid accessing undefined fields.
    function checkValidLocation(fn) {
      try {
        return fn();
      } catch (e) {
        return undefined;
      }
    }
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="App">
        <h1 className="Glow Title">Select a Genre or Search by Country</h1>
        {/* Sidebar that lists genres */}
        <div className="sidebar">
          <h1> {/* Buttons that highlight and submit a GET request when clicked */}
            <button onClick={()=>{this.handleSubmit('alternative'); this.toggle(0)}} style={{color: this.highlight(0), 'text-shadow': this.shadow(0)}} className="Glow-static one">Alternative</button>
            <button onClick={()=>{this.handleSubmit('k-pop'); this.toggle(1)}} style={{color: this.highlight(1), 'text-shadow': this.shadow(1)}} className="Glow-static two">K-Pop</button>
            <button onClick={()=>{this.handleSubmit('arabic'); this.toggle(2)}} style={{color: this.highlight(2), 'text-shadow': this.shadow(2)}} className="Glow-static one">Arabic</button>
            <button onClick={()=>{this.handleSubmit('metal'); this.toggle(3)}} style={{color: this.highlight(3), 'text-shadow': this.shadow(3)}} className="Glow-static two">Metal</button>
            <button onClick={()=>{this.handleSubmit('christian&gospel'); this.toggle(4)}} style={{color: this.highlight(4), 'text-shadow': this.shadow(4)}} className="Glow-static one">Christian & Gospel</button>
            <button onClick={()=>{this.handleSubmit('musicamexicana'); this.toggle(5)}} style={{color: this.highlight(5), 'text-shadow': this.shadow(5)}} className="Glow-static two">Música Mexicana</button>
            <button onClick={()=>{this.handleSubmit('classical'); this.toggle(6)}} style={{color: this.highlight(6), 'text-shadow': this.shadow(6)}} className="Glow-static one">Classical</button>
            <button onClick={()=>{this.handleSubmit('northafrican'); this.toggle(7)}} style={{color: this.highlight(7), 'text-shadow': this.shadow(7)}} className="Glow-static two">North African</button>
            <button onClick={()=>{this.handleSubmit('country'); this.toggle(8)}} style={{color: this.highlight(8), 'text-shadow': this.shadow(8)}} className="Glow-static one">Country</button>
            <button onClick={()=>{this.handleSubmit('pop'); this.toggle(9)}} style={{color: this.highlight(9), 'text-shadow': this.shadow(9)}} className="Glow-static two">Pop</button>
            <button onClick={()=>{this.handleSubmit('dance'); this.toggle(10)}} style={{color: this.highlight(10), 'text-shadow': this.shadow(10)}}className="Glow-static one">Dance</button>
            <button onClick={()=>{this.handleSubmit('pop-rock'); this.toggle(11)}} style={{color: this.highlight(11), 'text-shadow': this.shadow(11)}} className="Glow-static two">Pop/Rock</button>
            <button onClick={()=>{this.handleSubmit('dirtysouth'); this.toggle(12)}} style={{color: this.highlight(12), 'text-shadow': this.shadow(12)}} className="Glow-static one">Dirty South</button>
            <button onClick={()=>{this.handleSubmit('punk'); this.toggle(13)}} style={{color: this.highlight(13), 'text-shadow': this.shadow(13)}} className="Glow-static two">Punk</button>
            <button onClick={()=>{this.handleSubmit('electronic'); this.toggle(14)}} style={{color: this.highlight(14), 'text-shadow': this.shadow(14)}} className="Glow-static one">Electronic</button>
            <button onClick={()=>{this.handleSubmit('r&b-soul'); this.toggle(15)}} style={{color: this.highlight(15), 'text-shadow': this.shadow(15)}} className="Glow-static two">R&B/Soul</button>
            <button onClick={()=>{this.handleSubmit('frenchpop'); this.toggle(16)}} style={{color: this.highlight(16), 'text-shadow': this.shadow(16)}} className="Glow-static one">French Pop</button>
            <button onClick={()=>{this.handleSubmit('reggae'); this.toggle(17)}} style={{color: this.highlight(17), 'text-shadow': this.shadow(17)}} className="Glow-static two">Reggae</button>
            <button onClick={()=>{this.handleSubmit('hip-hop-rap'); this.toggle(18)}} style={{color: this.highlight(18), 'text-shadow': this.shadow(18)}} className="Glow-static one">Hip-Hop/Rap</button>
            <button onClick={()=>{this.handleSubmit('rock'); this.toggle(19)}} style={{color: this.highlight(19), 'text-shadow': this.shadow(19)}} className="Glow-static two">Rock</button>
            <button onClick={()=>{this.handleSubmit('j-pop'); this.toggle(20)}} style={{color: this.highlight(20), 'text-shadow': this.shadow(20)}} className="Glow-static one">J-pop</button>
            <button onClick={()=>{this.handleSubmit('trance'); this.toggle(21)}} style={{color: this.highlight(21), 'text-shadow': this.shadow(21)}} className="Glow-static two">Trance</button>
            <button onClick={()=>{this.handleSubmit('jazz'); this.toggle(22)}} style={{color: this.highlight(22), 'text-shadow': this.shadow(22)}} className="Glow-static one">Jazz</button>
            <button onClick={()=>{this.handleSubmit('world'); this.toggle(23)}} style={{color: this.highlight(23), 'text-shadow': this.shadow(23)}}className="Glow-static two">World</button>
          </h1>
        </div>
        {/* Display Longitude, Latitude, and Zoom on top right */}
        <div className="inline-block absolute top right mt30 mr30 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        {/* Display Map on the Screen */}
        <div ref={e => this.mapContainer = e} className="absolute top right left bottom"/>
        {/* Instructions to update map */}
        <div className="Glow-static Note">Note: To update the map after a selection, right-click anywhere on the map.</div>
      </div>
    );
  }
}

export default Mapbox;