import React from "react";
import Pagax from "pajax";
import Business from "./business"
var config = require("../config.json");

export default class BusinessList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            radius : config.map.radius,
            lat : config.map.latitude,
            long : config.map.longitude,
            businesses : []
        };
    }
    render() {
        var businesses = this.state.businesses.map(function(business) {
            return (
                <Business name={business.name} key={business._id} score={business.currentScore}>
                </Business>
            );
        });
        return (
            <div className="ui list">
                {businesses}
            </div>
        );
    }

    componentDidMount(){
        this.makeRequest();
    }
    async makeRequest(){
        var response = await Pagax.get("/api/business/search?radius=" + this.state.radius + "&lat=" + this.state.lat + "&long=" + this.state.long);
        debugger;
        this.setState({
            businesses : response.resource.results
        });
    }
}