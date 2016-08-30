import React from "react";
import DetailViewLinks from "./detail-view-links";
import { default as Moment } from 'moment';
import { default as _ } from 'lodash';

export default class DetailViewComponent extends React.Component {

    render() {
        if (this.props.selectedItem == null){
            return <div>
                <p>No known violations!</p>
            </div>
        }
        let formattedViolations =
                _(this.props.selectedItem.violations)
                    .orderBy(violation => new Moment(violation.date),"desc")
                    .groupBy(violation => new Moment(violation.date).format('MM/DD/YY'))
                    .map(violationGroup => {
                        console.log("here",violationGroup);
                       return (
                       <div className="ui card">
                           <div className="content">
                               <div className="header">{new Moment(violationGroup[0].date).format('MM/DD/YY')}</div>
                               <div className="meta">{this.getInspectionForDate(violationGroup[0].date).type}</div>
                               <div className="description">
                                   {violationGroup.map(violation => {
                                       return <p key={violation._id}>{violation.description}</p>
                                   })}
                               </div>
                           </div>
                           <div className="extra content">
                               <i className="check icon"></i>
                               {this.getInspectionForDate(violationGroup[0].date).score}
                           </div>
                       </div>
                       )
                    });
        const divProps = {...this.props};
        delete divProps.selectedItem;
        return (
            <div {...divProps}>
                <DetailViewLinks/>
                <div>
                    <h1 className="ui header">{this.props.selectedItem.name}</h1>
                    Score : { this.props.selectedItem.currentScore}
                        <div className="ui cards">
                            {formattedViolations.value()}
                            </div>
                </div>
            </div>
        );
    }

    getInspectionForDate(date) {
        return _.find(this.props.selectedItem.inspections,inspection => inspection.date === date);
    }
}