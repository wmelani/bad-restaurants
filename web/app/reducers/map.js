import { MAP_CENTER_CHANGED, CENTER_CHANGED, ZOOM_CHANGED} from '../constants/ActionTypes'

var config = require("../../config.json");

const initialState = {
    mapCenter : {
        lat : config.map.latitude,
        lng : config.map.longitude
    },
    zoomLevel : config.map.zoomLevel,
    markers : []
};

export default function map(state = initialState, action) {
    switch (action.type) {
        
        case MAP_CENTER_CHANGED:
            return {
                ...state,
                mapCenter : action.value
            };
        case CENTER_CHANGED:
            return {
                ...state,
                mapCenter : {
                    lat : action.value.lat,
                    lng : action.value.lng
                }
            };
        case ZOOM_CHANGED:
            return {
                ...state,
                zoomLevel : action.value
            };
        default:
            return state;
    }
}