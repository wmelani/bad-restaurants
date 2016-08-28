import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

const rootEl = document.getElementById("application");

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root store={ store }/>
        </AppContainer>
        , rootEl);

    if (module.hot) {
        module.hot.accept('./App', () => {
            // If you use Webpack 2 in ES modules mode, you can
            // use <App /> here rather than require() a <NextApp />.
            const NextApp = require('./containers/Root').default;
            ReactDOM.render(
                <AppContainer>
                    <NextApp />
                </AppContainer>,
                rootEl
            );
        });
    }
};
render();
