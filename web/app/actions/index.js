import * as ActionType from '../constants/ActionTypes';

import GeoLocationResolver from '../maps/geo-location-resolver';
import BusinessService from "../business-service";

export function getGeoLocation(){
    return async function(dispatch) {
        const geoLocation = await GeoLocationResolver.getGeoLocation();



        dispatch({ type : ActionType.GEOLOCATION_FETCHED, value : {
            lat : geoLocation.latitude,
            lng : geoLocation.longitude
        }});
    };

}
export function fetchBusinesses(mapCenter,radius,limit){
    return async function(dispatch) {

        const businessService = new BusinessService();
        let businesses = await businessService.searchUsingCoordinates(
            mapCenter,
            radius,
            limit);
        dispatch({ type: ActionType.FETCHED_BUSINESSES, value : businesses});
    };

}

export function pinClicked(pin){
    return function(dispatch){
        dispatch({ type: ActionType.PIN_SELECTED,value : pin});
    }
}
export function onCenterChanged(center){

    return function(dispatch){
        fetchBusinesses(center,500,50)(dispatch);
        dispatch({type: ActionType.CENTER_CHANGED, value : center});
    };
}
export function onZoomChanged(zoomLevel){
    return function(dispatch){
        dispatch({type: ActionType.ZOOM_CHANGED, value : zoomLevel});
    }
}