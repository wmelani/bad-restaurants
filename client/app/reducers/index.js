import { combineReducers } from 'redux';
import map from './map';
import data from './data';
import view from './view';


const rootReducer = combineReducers({
    map,
    data,
    view
});

export default rootReducer;