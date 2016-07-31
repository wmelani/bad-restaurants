import React from "react";
import ReactDOM from "react-dom";

import BusinessList from "./business-list";
import MapComponent from "./maps/map-component";
import Logo from './logo'

ReactDOM.render(
        <div className="ui container">
            <Logo/>
            <div>
                <MapComponent/>
            </div>
        </div>
    , document.getElementById("application"));