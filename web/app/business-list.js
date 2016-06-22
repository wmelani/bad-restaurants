import React from "react";
import Pagax from "pajax";
import Business from "./business"

export default class BusinessList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            radius : 500,
            lat : -122.43086,
            long : 37.801215,
            businesses : []
        };
    }
    render() {
        var businesses = this.state.businesses.map(function(business) {
            return (
                <Business name={business.name} key={business._id}>
                </Business>
            );
        });
        return (
            <div>
                {businesses}
            </div>
        );
    }

    componentDidMount(){
        this.makeRequest();
    }
    async makeRequest(){
        var response = await Pagax.get("/api/business/search?radius=" + this.state.radius + "&lat=" + this.state.lat + "&long=" + this.state.long);
        this.setState({
            businesses : response.resource.results
        });
    }
}