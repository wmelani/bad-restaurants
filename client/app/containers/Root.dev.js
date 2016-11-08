import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MapComponent from './map-component';
import DevTools from './DevTools';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        var divProps = {...this.props};
        delete divProps.store;
        return (
            <Provider store={store}>
                <div style={{width: "100%", "height" : "100%"}}>
                    <MapComponent/>
                    <DevTools className="ui right floated"/>
                </div>
            </Provider>
        );
        //
    }
}