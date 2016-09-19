import { PIN_SELECTED, MINIMUM_FILTER_CHANGED, MAXIMUM_FILTER_CHANGED, SEARCH_TEXT_CHANGED } from '../constants/ActionTypes'

const initialState = {
    selectedItem : {},
    minimumFilter : 0,
    maximumFilter : 100
};

export default function view(state = initialState, action) {
    switch (action.type) {
        case PIN_SELECTED:
            return {
                ...state,
                selectedItem : action.value
            };
        case MAXIMUM_FILTER_CHANGED:
            return {
                ...state,
                maximumFilter : action.value
            };
        case MINIMUM_FILTER_CHANGED:
            console.log(action);
            return {
                ...state,
                minimumFilter : action.value
            };
        case SEARCH_TEXT_CHANGED:
            return {
                ...state,
                searchText : action.value
            };
        default:
            return state;
    }
}