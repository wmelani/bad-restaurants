import { SEARCH_TEXT_CHANGED, SEARCH, RADIUS_CHANGED, MAP_CENTER_CHANGED, CENTER_CHANGED, ZOOM_CHANGED} from '../constants/ActionTypes'

var config = require("../../config.json");

const initialState = {
    radius : config.map.radius,
    mapCenter : {
        lat : config.map.latitude,
        lng : config.map.longitude
    },
    zoomLevel : config.map.zoomLevel,
    markers : []
};

export default function map(state = initialState, action) {
    switch (action.type) {
        case SEARCH_TEXT_CHANGED:
            return {
                ...state,
                searchText : action.value
            };
        case SEARCH:
            return state.filter(todo =>
                todo.id !== action.id
            );
        case RADIUS_CHANGED:
            return {
                ...state,
                radius : action.value
            };
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