import React from "react";

export default class Business extends React.Component {

    render() {
        return (
            <div key={this.props.key}>
                {this.props.name}
            </div>
        );
    }
}