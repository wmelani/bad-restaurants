import React from 'react';

import MapPin from '../map-pin';

import BadScoreIcon from '../../../images/BadScoreIcon.png';
import GoodScoreIcon from '../../../images/GoodScoreIcon.png';
import ModerateScoreIcon from '../../../images/ModerateScoreIcon.png';

export default class MapPinFactory {
    static createMapPin(business,onClickEvent){
        
        var imageUrl = GoodScoreIcon;

        if (business.currentScore < 85){
            imageUrl = ModerateScoreIcon;
        }
        if (business.currentScore < 70){
            imageUrl = BadScoreIcon;
        }
        return (<MapPin key={business._id} 
                        onClick={onClickEvent} 
                        imageUrl={imageUrl}
                        lat={business.location.coordinates[1]} 
                        lng={business.location.coordinates[0]}/>);
    }
}

