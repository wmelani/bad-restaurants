import React from "react";
import ReactDOM from "react-dom";
import Pagax from "pajax";

class HelloWorld extends React.Component {
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
                <div id={business._id}>
                    {business.name}
                </div>
            );
        });
        return (
            <div className="commentList">
                {businesses}
            </div>
        );
    }

    componentDidMount(){
        this.makeRequest();
    }
    async makeRequest(){
        var response = await Pagax.get("/api/business/search?radius=" + this.state.radius + "&lat=" + this.state.lat + "&long=" + this.state.long);
        console.log(response.resource.results);
        this.setState({
            businesses : response.resource.results
        });
    }
}

ReactDOM.render(<HelloWorld/>, document.getElementById("application"));
