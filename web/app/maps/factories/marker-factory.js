
export default class MarkerFactory {
    static createMarker(business){
        return {
            position : {
                lat : business.location.coordinates[1],
                lng : business.location.coordinates[0]
            },
            title: business.name,
            defaultAnimation: 2,
            key : business._id
        };
    }
}