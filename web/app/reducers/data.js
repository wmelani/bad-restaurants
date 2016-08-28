import { FETCHED_BUSINESSES} from '../constants/ActionTypes'

const initialState = {
    businesses : []
};

export default function data(state = initialState, action) {
    switch (action.type) {
        case FETCHED_BUSINESSES:
            return {
                ...state,
                businesses : action.value
            };
        default:
            return state;
    }
}