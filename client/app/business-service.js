import { default as axios } from 'axios';

export default class BusinessService {
    
    async searchUsingCoordinates(coordinates,radius,minValue,maxValue,limit){
        const route = `/api/business/search?radius=${radius}&lat=${coordinates.lat}&long=${coordinates.lng}&minimum=${minValue}&maximum=${maxValue}&limit=${limit}`;
        try {
            const response = await axios.get(route);
            return response.data.resource.results;
        }
        catch(e){
            console.error("Failed to search using coordinates with radius",radius,
                "lat",coordinates.lat,
                "long",coordinates.lng,
                "minimum filter",minValue,
                "maximum filter",maxValue,
                "and limit",limit,
                e);
            throw e;
        }
    }
    async searchByName(name,limit){
        var route = `/api/business/search-by-name?name=${name}&limit=${limit}`;
        try {
            const response = await axios.get(route);
            return response.data.resource.results;
        }
        catch(e){
            console.error("Failed to search by name",name,"and limit",limit,e);
            throw e;
        }
    }
}