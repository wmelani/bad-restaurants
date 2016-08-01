import React from "react";

export default class MapControls extends React.Component {

    constructor(){
        super();
    }
    render() {
        return (
            <div {...this.props}>
                <div className="ui input">
                    <input type="text" onChange={this.props.onSearchTextChanged} placeholder="Enter a location..."/>
                </div>

                <input type="range" onChange={this.props.onRadiusChanged}
                       min="0" max="1000" value={this.props.radiusValue} step="5"
                />

            </div>
        );
    }
}