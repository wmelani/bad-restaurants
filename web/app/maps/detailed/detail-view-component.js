import React from "react";
import DetailViewLinks from "./detail-view-links";
import { default as Moment } from 'moment';
export default class DetailViewComponent extends React.Component {

    constructor(){
        super();
    }

    render() {
        if (this.props.selectedItem == null){
            return <div></div>;
        }
        return (
            <div {...this.props}>
                <DetailViewLinks/>
                <div>
                    <h3>{this.props.selectedItem.name}</h3>
                    Score : { this.props.selectedItem.currentScore}

                    {this.props.selectedItem.violations.map(violation => {
                        return (<div>
                                    <div>{new Moment(violation.date).format('MM/DD/YYYY')}</div>
                                    <div>{violation.description}</div>
                                </div>)
                    })}
                </div>
            </div>
        );
    }
}