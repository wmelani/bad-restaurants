import React from "react";
import BadScoreIcon from '../../../images/BadScoreIcon.png';
import GoodScoreIcon from '../../../images/GoodScoreIcon.png';
import ModerateScoreIcon from '../../../images/ModerateScoreIcon.png';

export class MapPinFactory {
    static createMapPin(business,onClickEvent){

        var imageUrl = GoodScoreIcon;

        if (business.currentScore < 85){
            imageUrl = ModerateScoreIcon;
        }
        if (business.currentScore < 70){
            imageUrl = BadScoreIcon;
        }
        return (<MapPin key={business._id}
                        onClickEvent={onClickEvent}
                        imageUrl={imageUrl}
                        lat={business.location.coordinates[1]}
                        lng={business.location.coordinates[0]}/>);
    }
}

const MARKER_SIZE = 30;
const pinStyle = {
    position: 'absolute',
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    left: -MARKER_SIZE / 2,
    top: -MARKER_SIZE / 2
};


export const MapPin = ({imageUrl,onClickEvent}) => {
    return (
        <div onClick={onClickEvent} style={pinStyle}>
            <img src={imageUrl} width={MARKER_SIZE} height={MARKER_SIZE}/>
        </div>
    )
};