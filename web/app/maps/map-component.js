import React from "react";
import MapControls from './map-controls';
import MapView from './map-view';
import GeoLocationResolver from './geo-location-resolver';
import BusinessService from '../business-service';
import DetailViewComponent from './detailed/detail-view-component';
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
        this.handleMarkerSelected= this.handleMarkerSelected.bind(this);
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
    handleMarkerSelected(e){
        console.log("marker selected",e);
        this.setState({"selectedItem" : e});
    }
    async componentDidMount(){
        var geoLocation = await GeoLocationResolver.getGeoLocation();
        this.setState({"mapCenter" : {
            lat : geoLocation.latitude,
            lng : geoLocation.longitude
        }});
        this.businesses = await this.businessService.searchUsingCoordinates(this.state.mapCenter,this.state.radius,10);
        this.setState({ "markers" : this.businesses});
    }

    render() {
        return (
            <div {...this.props}>
                <div className="ui grid">
                    <MapControls className="left aligned sixteen wide column"
                        onSearchTextChanged={this.handleSearchChanged}
                        onRadiusChanged={this.handleRadiusChanged} />
                    <MapView className="twelve wide column"
                         styling={config.map.styling}
                        mapCenter={this.state.mapCenter}
                        markers={this.state.markers}
                        zoomLevel={this.state.zoomLevel}
                        onMarkerSelected={this.handleMarkerSelected}/>
                    <DetailViewComponent
                        className="four wide column"
                        selectedItem={this.state.selectedItem}/>
                </div>
            </div>

        );
    }
}