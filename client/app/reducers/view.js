import { PIN_SELECTED, FILTER_RANGE_CHANGED, SEARCH_TEXT_CHANGED } from '../constants/ActionTypes'

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
        case FILTER_RANGE_CHANGED:
            return {
                ...state,
                minimumFilter : action.value[0],
                maximumFilter : action.value[1]
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