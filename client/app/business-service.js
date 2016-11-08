import Pagax from "pajax";

export default class BusinessService {
    
    async searchUsingCoordinates(coordinates,radius,minValue,maxValue,limit){
        var route = `/api/business/search?radius=${radius}&lat=${coordinates.lat}&long=${coordinates.lng}&minimum=${minValue}&maximum=${maxValue}&limit=${limit}`;
        var response = await Pagax.get(route);
        return response.resource.results;
    }
    async searchByName(name,limit){
        var route = `/api/business/search-by-name?name=${name}&limit=${limit}`;
        var response = await Pagax.get(route);
        return response.resource.results;
    }
}