import React from "react";

export default class MapControls extends React.Component {

    constructor(){
        super();
    }
    render() {
        const divProps = {...this.props};
        delete divProps.onSearchTextChanged;
        delete divProps.onRadiusChanged;
        delete divProps.radiusValue;
        return (

            <div {...this.divProps}>
                <div className="ui input">
                    <input type="text" onChange={this.props.onSearchTextChanged} placeholder="Enter a location..."/>
                </div>

                <input type="range" onChange={this.props.onRadiusChanged}
                       min="1" max="100" value={this.props.radiusValue} step="1"
                />

            </div>
        );
    }
}