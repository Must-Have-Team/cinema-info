import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";


const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcSy9SCCQoXnJQhMBPsbjKuu9afVxC8Vs&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `300px`, width: `800px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => {
    return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 49.839683, lng: 24.029717 }}
    >
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.807411, lng: 23.978631 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.795381, lng: 24.057806 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.838633, lng: 24.027357 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.777218, lng: 23.961439 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.8503999, lng: 24.0198458 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
      {props.isMarkerShown && <MarkerWithLabel
                                position={{ lat: 49.844528, lng: 24.028258 }}
                                labelAnchor={{x:0,y:0}}
                                labelStyle={{color: "black", backgroundColor: "none", fontSize: "12px", padding: "4px"}}
                              >
                              <span></span>
                                </MarkerWithLabel>}
    </GoogleMap>
    )
  }
  )

  export default MyMapComponent;
