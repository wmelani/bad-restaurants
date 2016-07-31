import React from "react";

import { default as _ } from "lodash";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";

import MarkerFactory from './factories/marker-factory';
import { default as raf } from "raf";
export default class MapView extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize() {
        triggerEvent(this._googleMapComponent, "resize");
    }
    markerClicked(marker){
        if (typeof this.props.onMarkerSelected === "function"){
            this.props.onMarkerSelected(marker);
        }
    }


    render() {
        return (
            <div>
                <GoogleMapLoader
                    containerElement={
              <div
                {...this.props}
                style={{
                  height: "650px", width:"100%"
                }}
              />
            }
                googleMapElement={
              <GoogleMap
                ref={(map) => (this._googleMapComponent = map)}
                defaultZoom={this.props.zoomLevel}
                center={this.props.mapCenter}
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