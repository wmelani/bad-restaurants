import Pagax from "pajax";

export default class BusinessService {

    constructor() {

    }
    async searchUsingCoordinates(coordinates,radius,limit){
        var route = `/api/business/search?radius=${radius}&lat=${coordinates.lat}&long=${coordinates.lng}&limit=${limit}`;
        var response = await Pagax.get(route);
        return response.resource.results;
    }
}