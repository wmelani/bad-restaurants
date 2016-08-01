import React from "react";
import ReactDOM from "react-dom";
import MapComponent from "./maps/map-component";
import Logo from './logo'

ReactDOM.render(
        <div>

            <div className="ui grid">
                <Logo className="sixteen wide column"/>
                <div className="two wide column"></div>
                <MapComponent className="fourteen wide column"/>
            </div>
        </div>
    , document.getElementById("application"));