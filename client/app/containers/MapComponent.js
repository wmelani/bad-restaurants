import React from "react";
import MapControls from '../maps/map-controls/MapControls';
import MapView from '../maps/map-view/MapView';
import DetailViewComponent from '../maps/single-business-detail-view/detail-view-component';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import * as actions from '../actions';

class MapComponent extends React.Component {

    constructor(){
        super();
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.handleSearchChangedImpl = _.throttle(::this.handleSearchChangedImpl,500);
        this.handleCenterChanged = _.throttle(::this.handleCenterChanged,2500);
        this.handleFilterRangeChanged = _.throttle(::this.handleFilterRangeChanged,2500);
    }
    handleSearchChanged(e){
        const value = e.target.value;
        //this call is throttled. todo: why?
        this.handleSearchChangedImpl(value);
    }
    handleSearchChangedImpl(value){
        this.props.handleSearchChanged(value);
    }
    handleFilterRangeChanged(value){
        this.props.onFilterRangeChanged(value);
    }
    handleCenterChanged(e){
        this.props.onCenterChanged(e);
    }
    async componentDidMount(){
        try {
            await this.props.getGeoLocation();
        }
        catch (e){
            console.error("Failed to get location");
        }
        this.props.fetchBusinesses(
                this.props.map.mapCenter,
                this.props.map.zoomLevel,
                this.props.minimumFilter,
                this.props.maximumFilter,
                10);

    }
    render() {
        const { businesses, map, pinClicked, onZoomChanged, selectedItem } = this.props;

        return (
            <Grid id="map-page">
                <Grid.Column width={3}
                    style={{height:'100%', 'padding': 0}}
                >

                    <MapControls
                                 onSearchTextChanged={this.handleSearchChanged}
                                 onFilterRangeChanged={this.handleFilterRangeChanged} />

                </Grid.Column>
                <Grid.Column width={9} style={{'padding' : 0}}>

                    <MapView
                             markers={businesses}
                             mapCenter={map.mapCenter}
                             onMarkerSelected={pinClicked}
                             onCenterChanged={this.handleCenterChanged}
                             onZoomChanged={onZoomChanged}/>

                </Grid.Column>
                <Grid.Column width={4}>

                    <DetailViewComponent
                        selectedItem={selectedItem} />

                </Grid.Column>
            </Grid>

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
        selectedItem : state.view.selectedItem,
        minimumFilter : state.view.minimumFilter,
        maximumFilter : state.view.maximumFilter
    }
}
export default connect(mapStateToProps,actions)(MapComponent);