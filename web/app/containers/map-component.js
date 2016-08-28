import React from "react";
import MapControls from '../maps/map-controls';
import MapView from '../maps/map-view';
import DetailViewComponent from '../maps/detailed/detail-view-component';
import { connect } from 'react-redux';

import { default as config } from "../../config.json";
import * as actions from '../actions';

import {
    RADIUS_CHANGED,
    SEARCH_TEXT_CHANGED,
    PIN_CLICKED,
    MAP_CENTER_CHANGED,
    MARKERS_FETCHED,
    CENTER_CHANGED
} from '../constants/ActionTypes';

class MapComponent extends React.Component {

    constructor(){
        super();
        this.handleRadiusChanged = this.handleRadiusChanged.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.handleMarkerSelected= this.handleMarkerSelected.bind(this);
        this.handleCenterChanged = _.throttle(::this.handleCenterChanged,2500);
        
    }

    handleRadiusChanged(e){
        this.props.dispatch({ type : RADIUS_CHANGED, value: Number.parseInt(e.target.value,10)});

    }
    handleSearchChanged(e){
        this.props.dispatch({ type : SEARCH_TEXT_CHANGED, value : e.target.value});
    }
    handleMarkerSelected(e){
        this.props.pinClicked(e);
    }
    handleCenterChanged(e){
        this.props.onCenterChanged(e);
    }
    
    async componentDidMount(){
       this.props.getGeoLocation();
       this.props.fetchBusinesses(this.props.map.mapCenter,this.props.map.radius,10);
    }
    render() {
        const mapParams = this.props.map;
        let divProps = {...this.props};
        delete divProps.businesses;
        delete divProps.map;
        delete divProps.dispatch;
        delete divProps.getGeoLocation;
        delete divProps.fetchBusinesses;
        delete divProps.pinClicked;
        delete divProps.onCenterChanged;
        //
        // <DetailViewComponent
        //     className="four wide column"
        //     selectedItem={mapParams.selectedItem}/>
        return (
            <div {...divProps}>
                <div className="ui grid">
                    <MapControls className="left aligned sixteen wide column"
                        onSearchTextChanged={this.handleSearchChanged}
                        onRadiusChanged={this.handleRadiusChanged} />
                    <MapView className="twelve wide column"
                        styling={config.map.styling}
                        mapCenter={mapParams.mapCenter}
                        markers={this.props.businesses}
                        zoomLevel={mapParams.zoomLevel}
                        onMarkerSelected={this.handleMarkerSelected}
                        onCenterChanged={this.handleCenterChanged}/>

                </div>
            </div>

        );
    }
    static contextTypes : {
        store : React.PropTypes.object
    }
}
function mapStateToProps(state) {
    return {
        map: state.map,
        businesses : state.data.businesses
    }
}
export default connect(mapStateToProps,actions)(MapComponent);