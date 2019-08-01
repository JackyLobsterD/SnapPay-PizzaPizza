// @ts-ignore
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React,{Component} from 'react';


export class MapContainer extends React.Component {
  render() {
    const mapStyles = {
      width: '90%',
      height: '400px',
    };
    const triangleCoords = [
      { lat: 25.774, lng: -80.190 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.190 }
    ];
    return (
      <Map
        // @ts-ignore
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 43.601754, lng: -79.640831 }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE')
})(MapContainer)
