import React from "react";

import { default as _ } from "lodash";

import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';

import * as utilities from '../utilities';

import { default as config } from '../../config.json';

import MapPinFactory from "./factories/map-pin-factory";

const MAP_VARIANCE = 0.00000000001000;

export default class MapView extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.onChange= _.throttle(::this.onChange,500);
        this.defaultZoom = config.map.zoomLevel;
        this.defaultMapCenter = { lat : config.map.latitude, lng : config.map.longitude};
        this.currentZoom = this.defaultZoom;

     }

    onChange(changes){
        if (this.currentZoom != changes.zoom){
            this.props.onZoomChanged(changes.zoom);
        }
        this.currentZoom = changes.zoom;
        if (!this.props.onCenterChanged) { return; }
        var {lat, lng} = changes.center;
        if (this.wasMapMovedSufficientlyFar(lat,lng)){
            console.log("moved far");
            this.props.onCenterChanged(changes.center);
        }

    }

    wasMapMovedSufficientlyFar(lat,lng){
        return this.props.mapCenter &&
            (!utilities.approximatelyEqual(this.props.mapCenter.lat,lat,MAP_VARIANCE)
            || !utilities.approximatelyEqual(this.props.mapCenter.lng,lng,MAP_VARIANCE));
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    getMarkers(){
        return this.props.markers.map(marker => {
            return MapPinFactory.createMapPin(marker,this.props.onMarkerSelected.bind(this,marker));
        });
    }
    render() {
        const divProps = {...this.props};
        delete divProps.markers;
        delete divProps.mapCenter;
        delete divProps.onZoomChanged;
        delete divProps.onMarkerSelected;
        delete divProps.onCenterChanged;
        return (
            <div id="map-view" {...divProps}>
              <GoogleMap
                defaultZoom={this.defaultZoom}
                defaultCenter={this.defaultMapCenter}
                options={{ styles : config.map.styling}}
                onChange={this.onChange}
              >
                  {this.getMarkers()}
              </GoogleMap>
            </div>
        );
    }
}



