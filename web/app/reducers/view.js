import { PIN_SELECTED } from '../constants/ActionTypes'

const initialState = {
    selectedItem : {}
};

export default function data(state = initialState, action) {
    switch (action.type) {
        case PIN_SELECTED:
            return {
                ...state,
                selectedItem : action.value
            };
        default:
            return state;
    }
}