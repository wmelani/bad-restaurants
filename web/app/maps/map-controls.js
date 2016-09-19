import React from "react";
import { Divider, Dropdown } from 'stardust'
export default class MapControls extends React.Component {

    constructor(){
        super();
        this.range = [];
        for (let v = 0; v <= 100; v = v+5){
            this.range.push({ "text" : v, "value" : v});
        }
        this.fromRange = [...this.range];
        this.toRange = [ ...this.range];
    }
    // shouldComponentUpdate(nextProps){
    //     if (this.props.minimumFilterValue != nextProps.minimumFilterValue){
    //         this.toRange = this.range.filter(mem => mem.value >= nextProps.minimumFilterValue);
    //         console.log("to range",this.toRange);
    //         this.toSelectedIndex = this.toRange.findIndex(mem => mem.value === this.props.maximumFilterValue);
    //
    //     }
    //     if (this.props.maximumFilterValue != nextProps.maximumFilterValue) {
    //         this.fromRange = this.range.filter(mem => mem.value <= nextProps.maximumFilterValue);
    //         console.log("from range", this.fromRange);
    //         this.fromSelectedIndex = this.fromRange.findIndex(mem => mem.value === this.props.minimumFilterValue);
    //     }
    //     return true;
    // }
    render() {
        const divProps = {...this.props};
        delete divProps.onSearchTextChanged;
        delete divProps.onMinimumFilterChanged;
        delete divProps.onMaximumFilterChanged;
        return (

            <div {...divProps} id="map-controls-desktop">
                <h2 className="ui inverted header">Filter</h2>
                

                <div className="ui labeled input">
                    <a className="ui label">Search</a>
                    <input type="text"
                           id="searchTextBox"
                           onChange={this.props.onSearchTextChanged}
                           placeholder="Enter a location..."/>
                </div>
                <Divider/>

                <Dropdown
                    options={this.fromRange}
                    placeholder='Minimum Score'
                    value={this.props.minimumFilterValue}
                    selection
                    //selectedIndex={this.fromSelectedIndex}
                    onChange={this.props.onMinimumFilterChanged}
                />
                <Divider horizontal>to</Divider>
                <Dropdown
                    options={this.toRange}
                    placeholder='Maximum Score'
                    selection
                    //selectedIndex={this.toSelectedIndex}
                    value={this.props.maximumFilterValue}
                    onChange={this.props.onMaximumFilterChanged}
                />
                <Divider/>
            </div>
        );
    }
}