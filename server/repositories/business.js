var mongoose = require('mongoose');
var Q = require('q');
var app = require('../app');


function * findById(id){
    if (!mongoose.Types.ObjectId.isValid(id)){
        app.logger.error("id is not in valid format" + id);
        throw new Error("id is not in a valid format",id);
    }
    try {
        var result =  yield Q.nfcall(app.models.Business.findById.bind(app.models.Business),id);
        return result;
    }
    catch(e){
        app.logger.error("Error finding by id",e);
        console.log(e);
        throw e;
    }

}

function * search(params){
    if (params.lat == undefined || params.long == undefined){
        app.logger.error("Lat / Long are required");
        throw new Error("Lat / Long are required");
    }
    if (params.radius <= 0){
        app.logger.error("Radius must be greater than 0");
        throw new Error("Radius must be greater than 0");
    }
    try {
        var result =  yield Q.nfcall(app.models.Business.find.bind(app.models.Business),
            { "location.coordinates": { '$near': {
                '$maxDistance': params.radius,
                '$geometry': { type: 'Point', coordinates: [ params.lat, params.long ] } } }
            });
        app.logger.error("Found " + result.length + " results for search with params " + JSON.stringify(params,null,4));

        return result;
    }
    catch(e){

        app.logger.error("Error searching for businesses", e);
        throw e;
    }
}

module.exports = exports;
exports.findById = findById;
exports.search = search;