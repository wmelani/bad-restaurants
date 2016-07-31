import React from "react";
import MapControls from './map-controls';
import MapView from './map-view';
import GeoLocationResolver from './geo-location-resolver';
import BusinessService from '../business-service';
import MarkerFactory from './factories/marker-factory';

var config = require("../../config.json");

export default class MapComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            radius : config.map.radius,
            mapCenter : {
                lat : config.map.latitude,
                lng : config.map.longitude
            },
            zoomLevel : config.map.zoomLevel,
            markers : []
        };
        this.handleRadiusChanged = this.handleRadiusChanged.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.businessService = new BusinessService();
    }

    handleRadiusChanged(e){
        console.log("value is becoming", e.target.value);
        this.setState({value : e.target.value});
    }
    handleSearchChanged(e){
        console.log("value is becoming ", e.target.value);
        this.setState({"searchQuery" : e.target.value})
    }
    async componentDidMount(){
        var geoLocation = await GeoLocationResolver.getGeoLocation();
        this.setState({"mapCenter" : {
            lat : geoLocation.latitude,
            lng : geoLocation.longitude
        }});
        this.businesses = await this.businessService.searchUsingCoordinates(this.state.mapCenter,this.state.radius,10);
        this.setState({ "markers" : this.businesses.map(business => MarkerFactory.createMarker(business))});
    }

    render() {
        return (
            <div>
                <MapControls onSearchTextChanged={this.handleSearchChanged} onRadiusChanged={this.handleRadiusChanged}/>
                <MapView mapCenter={this.state.mapCenter} markers={this.state.markers} zoomLevel={this.state.zoomLevel}/>
            </div>
        );
    }
}