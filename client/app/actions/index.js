import * as ActionType from '../constants/ActionTypes';

import GeoLocationResolver from '../utilities/GeoLocationResolver';
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
export function fetchBusinesses(mapCenter,radius,minValue,maxValue,limit){
    return async function(dispatch) {
        dispatch({type: ActionType.FETCHING_BUSINESSES});
        const businessService = new BusinessService();
        try {
            let businesses = await businessService.searchUsingCoordinates(
                mapCenter,
                500,
                minValue,
                maxValue,
                limit);
            dispatch({ type: ActionType.FETCHED_BUSINESSES, value : businesses});
        }
        catch(e){
            dispatch({type: ActionType.FETCH_BUSINESSES_ERROR, value : e});
        }

    };

}

export function searchBusinessesByName(name,limit){
    return async function(dispatch) {
        dispatch({type: ActionType.FETCHING_BUSINESSES});
        const businessService = new BusinessService();
        try {
            let businesses = await businessService.searchByName(name,limit);
            dispatch({ type: ActionType.FETCHED_BUSINESSES, value : businesses});
        }
        catch(e){
            dispatch({type: ActionType.FETCH_BUSINESSES_ERROR, value : e});
        }

    };

}

export function pinClicked(pin){
    return function(dispatch){
        dispatch({ type: ActionType.PIN_SELECTED,value : pin});
    }
}
export function onCenterChanged(center){

    return function(dispatch,getState){
        dispatch({type: ActionType.CENTER_CHANGED, value : center});
        const state = getState();
        fetchBusinesses(center,500,state.view.minimumFilter,state.view.maximumFilter,25)(dispatch,getState);

    };
}
export function onZoomChanged(zoomLevel){
    return function(dispatch){
        dispatch({type: ActionType.ZOOM_CHANGED, value : zoomLevel});
    }
}
export function onFilterRangeChanged(e){
    return function(dispatch){
        dispatch({type : ActionType.FILTER_RANGE_CHANGED, value : e})
    }
}
export function handleSearchChanged(e){
    return function(dispatch,getState){
        dispatch({type: ActionType.SEARCH_TEXT_CHANGED, value : e});
        if (e.length > 2){
            dispatch({type : ActionType.SEARCH, value : e});
            const state = getState();
            searchBusinessesByName(e,25)(dispatch,state);
        }
    }
}