import React from "react";

import { default as _ } from "lodash";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapView extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.state = {
                markers: [],
            };
        /*
         {
         position: {
         lat: 25.0112183,
         lng: 121.52067570000001,
         },
         key: "Taiwan",
         defaultAnimation: 2,
         }
         */
        this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize() {
        console.log("handleWindowResize", this._googleMapComponent);
        triggerEvent(this._googleMapComponent, "resize");
    }

    render() {
        debugger;
        return (
            <GoogleMapLoader
                containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
                googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map)}
            defaultZoom={14}
            defaultCenter={{lat: 37.801, lng: -122.538}}
          >
            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                />
              );
            })}
          </GoogleMap>
        }
            />
        );
    }
}