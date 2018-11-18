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
  constructor(props) {
    super(props);
    this.state = {
      lng: 6,
      lat: 30,
      zoom: 1.5,
      query: '',
      show: true
    };
    this.toggleDisplay.bind(this);
  }

  // Sets the query to the Genre or Artist Name
  handleChange(e) {
    const { target } = e;
    const { query, value } = target;

    this.setState({
      [query]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    request
      .get('http://localhost:8000/api/genres')
      .then(res => {
        // res.body, res.headers, res.status
        console.log(res.body);
        let m = res.body;
      })
      .catch(err => {
        // err.message, err.response
        console.log(err.message);
      });

    // request
    //   .post('http://localhost:8000/')
    //   .send({
    //     ...this.state,
    //     name: `${this.state.firstname} ${this.state.lastname}`,
    //   })
    //   .then(response => {
    //     localStorage.setItem('trips-user', JSON.stringify(response.body));
    //     this.props.history.push('/search');
    //   });
  }

  toggleDisplay = () => {
    const {show} = this.state;
    this.setState( {show: !show})
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    // Initialize map
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom
    });

    // Search bar by location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    }));

    // Toggle fullscreen
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    let countryList = [];
    countryList.push('United States');
    countryList.push('Mexico');
    countryList.push('China')

    let markers = [];
    // Gets geolocation from country name.
    // TODO: Change query input to a variable from the data set.
    for(let i = 0; i < countryList.length; i++) {
      geocodingClient.forwardGeocode({
        query: countryList[i],
        limit: 1
      })
      .send()
      .then(response => {
        let geolocation = response.body.features[0].geometry.coordinates;
        // Adds a marker at the specified location.
        markers.push(new mapboxgl.Marker()
        .setLngLat(geolocation)
        .addTo(map));
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
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="App">
        <h1 className="toggle-sidebar">
          <button onClick={this.toggleDisplay && this.handleSubmit} className="Glow">Toggle List</button>
        </h1>
        {this.state.show && <Sidebar />}
        {/* Display Longitude, Latitude, and Zoom on top left */}
        <div className="inline-block absolute top right mt30 mr36 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        {/* Display Map on the Screen */}
        <div ref={e => this.mapContainer = e} className="absolute top right left bottom"/>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    return(
      <div className="sidebar">Country List</div>
    )
  }
}

export default Mapbox;