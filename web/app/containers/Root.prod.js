import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MapComponent from './map-component';
import Logo from '../logo'
export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div className="ui grid">
                    <Logo className="sixteen wide column"/>
                    <div className="two wide column"></div>
                    <MapComponent className="fourteen wide column"/>
                </div>
            </Provider>
        );
    }
}