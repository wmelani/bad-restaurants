import React from "react";

import { default as _ } from "lodash";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";

import MarkerFactory from './factories/marker-factory';
import { default as raf } from "raf";
import * as utilities from '../utilities';

const MAP_VARIANCE = 0.00000000001000;
export default class MapView extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
        this.handleMapMoved = _.throttle(::this.handleMapMoved,2500);
        this.handleZoomLevelChanged = this.handleZoomLevelChanged.bind(this);
     }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleWindowResize() {
        triggerEvent(this._googleMapComponent, "resize");
    }
    markerClicked(marker){
        if (typeof this.props.onMarkerSelected === "function"){
            this.props.onMarkerSelected(marker);
        }
    }
    handleZoomLevelChanged(){
        var zoomLevel = this._googleMapComponent.getZoom();
        console.log(zoomLevel);
    }
    handleMapMoved(){
        if (typeof this.props.onCenterChanged === "function"){
            var center = this._googleMapComponent.getCenter();
            var lat = center.lat();
            var lng = center.lng();
            if (this.wasMapMovedSufficientlyFar(lat,lng)){
                console.log("moved far");
                this.props.onCenterChanged({ lat : lat, lng : lng });
            }else {
                console.log("map was not moved far enough.");
            }

        }
    }

    wasMapMovedSufficientlyFar(lat,lng){
        return !utilities.approximatelyEqual(this.props.mapCenter.lat,lat,MAP_VARIANCE)
            || !utilities.approximatelyEqual(this.props.mapCenter.lng,lng,MAP_VARIANCE);
    }

    shouldComponentUpdate(nextProps) {
        var shouldUpdate = !_.isEqual(this.props.markers,nextProps.markers);
        console.log("should update: " + shouldUpdate);
        return shouldUpdate;
    }

    render() {
        console.log("rendering mapview");
        const divProps = {...this.props};
        delete divProps.mapCenter;
        delete divProps.styling;
        delete divProps.markers;
        delete divProps.zoomLevel;
        delete divProps.onMarkerSelected;
        delete divProps.onCenterChanged;
        return (
            <div {...divProps}>
                <GoogleMapLoader
                    containerElement={
              <div
                style={{
                  height: "650px", width:"100%"
                }}
              ></div>
            }
                googleMapElement={
              <GoogleMap
                ref={(map) => (this._googleMapComponent = map)}
                defaultZoom={this.props.zoomLevel}
                center={this.props.mapCenter}
                defaultOptions={{
                    styles: this.props.styling
                }}
                onCenterChanged={this.handleMapMoved}
                onZoomChanged={this.handleZoomLevelChanged}
                

              >
                {this.props.markers.map((marker) => {
                    var formattedMarker = MarkerFactory.createMarker(marker);
                  return (
                    <Marker onClick={this.markerClicked.bind(this,marker)}
                      {...formattedMarker}
                    />
                  );
                })}
              </GoogleMap>
            }
                />
                </div>
        );
    }
}