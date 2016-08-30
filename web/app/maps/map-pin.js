import React from "react";

export default class MapPin extends React.Component {

    render(){
        return <div onClick={this.props.onClick} style={{width: "30px", height: "30px"}}>
                    <img src={this.props.imageUrl} width="30" height="30"/>
            </div>
    }
}