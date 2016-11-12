import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MapComponent from './MapComponent';
import DevTools from './DevTools';

export default class Root extends Component {
// <DevTools className="ui right floated"/>
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div style={{width: "100%", "height" : "100%"}}>
                    <MapComponent/>

                </div>
            </Provider>
        );
    }
}