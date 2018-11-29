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
      result: []
    };
  }
  
  handleSubmit(event) {
    request
      .get('http://localhost:8000/api/' + event)
      .then(res => {
        // res.body, res.headers, res.status
        this.setState(currentState => ({ result: res.body }));
      })
      .catch(err => {
        // err.message, err.response
        console.log(err.message);
      });
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

    // TODO: Clear all markers from map at the beginning of this event.
    let markers = [];
    map.on('contextmenu', () => {
      // Clears all existing markers before loading new ones
      while((Array.isArray(markers) && markers.length)) {
        markers[markers.length - 1].remove();
        markers.pop();
      }
      // Gets geolocation from country name.
      let countryList = this.state.result;
      for(let i = 0; i < countryList.length; i++) {
        geocodingClient.forwardGeocode({
          query: countryList[i].CountryName,
          limit: 1
        })
        .send()
        .then(response => {
          let geolocation = response.body.features[0].geometry.coordinates;
          // Pass el into mapboxgl.Marker(el) for custom marker
          // var el = document.createElement('div');
          // el.className = 'marker';
          // Adds a marker at the specified location.
          markers.push(new mapboxgl.Marker()
          .setLngLat(geolocation)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + countryList[i].CountryName + '</h3><p>Top Genre: ' + countryList[i].TopGenre + '</p><p>Followers: ' + countryList[i].NumFollowers + '</p>'))
          .addTo(map));
        })
      }
    });
    
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
        {/* Sidebar that lists genres */}
        <div className="sidebar">
          <h1>
            <div className="Glow one">Select a Genre</div>
            <div className="Glow two">Select a Genre</div>
          </h1>
          <h2>
            <button onClick={()=>this.handleSubmit('alternative')} className="Glow-static one">Alternative</button>
            <button onClick={()=>this.handleSubmit('k-pop')} className="Glow-static two">K-Pop</button>
            <button onClick={()=>this.handleSubmit('arabic')} className="Glow-static one">Arabic</button>
            <button onClick={()=>this.handleSubmit('metal')} className="Glow-static two">Metal</button>
            <button onClick={()=>this.handleSubmit('christian&gospel')} className="Glow-static one">Christian & Gospel</button>
            <button onClick={()=>this.handleSubmit('musicamexicana')} className="Glow-static two">Música Mexicana</button>
            <button onClick={()=>this.handleSubmit('classical')} className="Glow-static one">Classical</button>
            <button onClick={()=>this.handleSubmit('northafrican')} className="Glow-static two">North African</button>
            <button onClick={()=>this.handleSubmit('country')} className="Glow-static one">Country</button>
            <button onClick={()=>this.handleSubmit('pop')} className="Glow-static two">Pop</button>
            <button onClick={()=>this.handleSubmit('dance')} className="Glow-static one">Dance</button>
            <button onClick={()=>this.handleSubmit('pop-rock')} className="Glow-static two">Pop/Rock</button>
            <button onClick={()=>this.handleSubmit('dirtysouth')} className="Glow-static one">Dirty South</button>
            <button onClick={()=>this.handleSubmit('punk')} className="Glow-static two">Punk</button>
            <button onClick={()=>this.handleSubmit('electronic')} className="Glow-static one">Electronic</button>
            <button onClick={()=>this.handleSubmit('r&b-soul')} className="Glow-static two">R&B/Soul</button>
            <button onClick={()=>this.handleSubmit('frenchpop')} className="Glow-static one">French Pop</button>
            <button onClick={()=>this.handleSubmit('reggae')} className="Glow-static two">Reggae</button>
            <button onClick={()=>this.handleSubmit('hip-hop-rap')} className="Glow-static one">Hip-Hop/Rap</button>
            <button onClick={()=>this.handleSubmit('rock')} className="Glow-static two">Rock</button>
            <button onClick={()=>this.handleSubmit('j-pop')} className="Glow-static one">J-pop</button>
            <button onClick={()=>this.handleSubmit('trance')} className="Glow-static two">Trance</button>
            <button onClick={()=>this.handleSubmit('jazz')} className="Glow-static one">Jazz</button>
            <button onClick={()=>this.handleSubmit('world')} className="Glow-static two">World</button>
          </h2>
        </div>
        {/* Display Longitude, Latitude, and Zoom on top right */}
        <div className="inline-block absolute top right mt30 mr120 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        {/* Display Map on the Screen */}
        <div ref={e => this.mapContainer = e} className="absolute top right left bottom"/>
      </div>
    );
  }
}

export default Mapbox;