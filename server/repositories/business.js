const mongoose = require('mongoose');
const Q = require('q');
const app = require('../app');


function * findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        app.logger.error("id is not in valid format" + id);
        throw new Error("id is not in a valid format", id);
    }
    try {
        return yield Q.nfcall(app.models.Business.findById.bind(app.models.Business), id);
    }
    catch (e) {
        app.logger.error("Error finding by id", e);
        console.log(e);
        throw e;
    }

}

function * search(params) {
    if (params.lat == undefined || params.long == undefined) {
        app.logger.error("Lat / Long are required");
        throw new Error("Lat / Long are required");
    }
    if (params.radius <= 0) {
        app.logger.error("Radius must be greater than 0");
        throw new Error("Radius must be greater than 0");
    }
    try {
        const query = app.models.Business.find( {
            "location.coordinates": {
                '$near': {
                    '$maxDistance': params.radius,
                    '$geometry': {type: 'Point', coordinates: [params.long, params.lat]}
                }
            },
            "currentScore" : { $gte : params.minimum, $lte : params.maximum}

        }).limit(params.limit);

        const result = yield Q.nfcall(query.exec.bind(query));
        console.log(result.length);
        app.logger.info("Found " + result.length + " results for search with params " + JSON.stringify(params, null, 4));

        return result;
    }
    catch (e) {

        app.logger.error("Error searching for businesses", e);
        throw e;
    }
}

function * searchByName(params) {
    if (params.name == undefined) {
        app.logger.error("Name is required");
        throw new Error("Name is required");
    }
    try {

        const query = app.models.Business.aggregate( [
            // Stage 1
            {
                $match: { '$text': { '$search': params.name } }
            },

            // Stage 2
            {
                $sort: { score : {$meta:'textScore'}}
            },
            //Stage 3
            { $limit : parseInt(params.limit,10) }
        ]);

        const result = yield Q.nfcall(query.exec.bind(query));
        console.log(result.length);
        app.logger.info("Found " + result.length + " results for search with params " + JSON.stringify(params, null, 4));

        return result;
    }
    catch (e) {

        app.logger.error("Error searching for businesses", e);
        throw e;
    }
}

module.exports = exports;
exports.findById = findById;
exports.search = search;
exports.searchByName = searchByName;
