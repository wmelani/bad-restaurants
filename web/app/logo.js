import React from "react";

export default class Logo extends React.Component {

    render() {
        return (
            <div {...this.props}>
                <h2 className="ui header">Bad Restaurants</h2>
            </div>
        );
    }
}