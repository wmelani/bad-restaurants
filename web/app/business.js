import React from "react";

export default class Business extends React.Component {

    render() {
        return (
            <div className="item" key={this.props.key}>
                <div className="header">{this.props.name}</div>
                <div>{this.props.score}</div>
            </div>
        );
    }
}