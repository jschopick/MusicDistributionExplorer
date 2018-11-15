import React, { Component } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import TOKEN from './config/MAPBOX.js';
import './App.css';

mapboxgl.accessToken = TOKEN.key;

class Mapbox extends Component {
  // Sets center of page and default zoom
  constructor(props) {
    super(props);
    this.state = {
      lng: 6,
      lat: 30,
      zoom: 1.5
    };
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

    // Adds a marker at the specified location.
    // new mapboxgl.Marker()
    //   .setLngLat([30.5, 50.5])
    //   .addTo(map);

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
        <div className="sidebar">Country List</div>
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

export default Mapbox;