import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MapComponent from './map-component';
import DevTools from './DevTools';
import Logo from '../logo'

export default class Root extends Component {
    render() {
        const { store } = this.props;
        var divProps = {...this.props};
        delete divProps.store;
        return (
            <Provider store={store}>
                <div className="ui grid" {...divProps}>
                    <Logo className="sixteen wide column"/>
                    <MapComponent className="eleven wide column"/>
                    <DevTools className="sixteen wide column"/>
                </div>
            </Provider>
        );
    }
}