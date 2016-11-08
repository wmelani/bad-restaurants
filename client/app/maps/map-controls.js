import React from "react";
import { Header, Input, Container } from 'semantic-ui-react'
require('rc-slider/assets/index.css');
const Slider = require('rc-slider');
export default class MapControls extends React.Component {

    constructor(){
        super();
    }

    render() {
        const divProps = {...this.props};
        delete divProps.onSearchTextChanged;
        delete divProps.onFilterRangeChanged;
        return (

            <Container id="map-controls-desktop" textAlign="center">
                <Header as="h2" inverted>Filter</Header>
                <Input
                    icon='search'
                    style={{width: '80%'}}
                    placeholder='Blue Barn'
                    onChange={this.props.onSearchTextChanged}
                />
                <Slider
                    defaultValue={[0, 100]}
                    onChange={this.props.onFilterRangeChanged}
                    range={true}
                    allowCross={false}
                />
            </Container>
        );
    }
}