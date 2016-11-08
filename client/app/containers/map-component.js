import React from "react";
import MapControls from '../maps/map-controls';
import MapView from '../maps/map-view';
import DetailViewComponent from '../maps/detailed/detail-view-component';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import * as actions from '../actions';

class MapComponent extends React.Component {

    constructor(){
        super();
        this.handleSearchChanged = //_.throttle(::this.handleSearchChanged,2500);
                                    this.handleSearchChanged.bind(this);
        this.handleSearchChangedImpl = _.throttle(::this.handleSearchChangedImpl,500);
        this.handleCenterChanged = _.throttle(::this.handleCenterChanged,2500);
        this.handleFilterRangeChanged = _.throttle(::this.handleFilterRangeChanged,2500);
    }
    handleSearchChanged(e){
        const value = e.target.value;
        //this call is throttled.
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
       this.props.getGeoLocation();
       this.props.fetchBusinesses(this.props.map.mapCenter,this.props.map.zoomLevel,this.props.minimumFilter,this.props.maximumFilter,10);
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
                             markers={this.props.businesses}
                             mapCenter={this.props.map.mapCenter}
                             onMarkerSelected={this.props.pinClicked}
                             onCenterChanged={this.handleCenterChanged}
                             onZoomChanged={this.props.onZoomChanged}/>

                </Grid.Column>
                <Grid.Column width={4}>

                    <DetailViewComponent
                        selectedItem={this.props.selectedItem} />

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