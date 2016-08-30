import React from "react";
import MapControls from '../maps/map-controls';
import MapView from '../maps/map-view';
import DetailViewComponent from '../maps/detailed/detail-view-component';
import { connect } from 'react-redux';

import * as actions from '../actions';

import {
    RADIUS_CHANGED,
    SEARCH_TEXT_CHANGED
} from '../constants/ActionTypes';

class MapComponent extends React.Component {

    constructor(){
        super();
        this.handleRadiusChanged = this.handleRadiusChanged.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.handleCenterChanged = _.throttle(::this.handleCenterChanged,2500);
        
    }

    handleRadiusChanged(e){
        this.props.dispatch({ type : RADIUS_CHANGED, value: Number.parseInt(e.target.value,10)});

    }
    handleSearchChanged(e){
        this.props.dispatch({ type : SEARCH_TEXT_CHANGED, value : e.target.value});
    }
    handleCenterChanged(e){
        this.props.onCenterChanged(e);
    }
    async componentDidMount(){
       this.props.getGeoLocation();
       this.props.fetchBusinesses(this.props.map.mapCenter,this.props.map.radius,10);
    }
    render() {
        let divProps = {...this.props};
        delete divProps.businesses;
        delete divProps.map;
        delete divProps.dispatch;
        delete divProps.getGeoLocation;
        delete divProps.fetchBusinesses;
        delete divProps.pinClicked;
        delete divProps.onCenterChanged;
        delete divProps.selectedItem;
        return (
            <div {...divProps}>
                <div className="ui grid">
                    <MapControls className="left aligned sixteen wide column"
                        onSearchTextChanged={this.handleSearchChanged}
                        onRadiusChanged={this.handleRadiusChanged} />
                    <MapView className="twelve wide column"
                        markers={this.props.businesses}
                         mapCenter={this.props.map.mapCenter}
                        onMarkerSelected={this.props.pinClicked}
                        onCenterChanged={this.handleCenterChanged}
                        onZoomChanged={this.props.onZoomChanged}/>
                    <DetailViewComponent selectedItem={this.props.selectedItem} />

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
        businesses : state.data.businesses,
        selectedItem : state.view.selectedItem
    }
}
export default connect(mapStateToProps,actions)(MapComponent);