var app = require('../app');
var responseEnvelopeHelper = require("./responseEnvelopeHelper");
var searchParamFactory = require('../searchParamFactory/business');
function *findById(next){
    try {
        var business = yield app.repositories.Business.findById(this.params.id);
        if (business == null){
            this.statusCode = 404;
            this.body = responseEnvelopeHelper.buildErrorEnvelope("Business with id " + this.params.id + " not found",404);
            return;
        }
        this.body = responseEnvelopeHelper.buildSingleResponseEnvelope(business);
    }
    catch(e){
        this.statusCode = 422; //todo: distinguish between client-errors and server errors
        this.body = responseEnvelopeHelper.buildErrorEnvelope(e,422);
    }
}

function *search(next){
    try {
        var searchParams  = searchParamFactory.searchBusinesses(this.query);
        var businesses = yield app.repositories.Business.search(searchParams);
        this.body = responseEnvelopeHelper.buildCollectionResponseEnvelope(businesses)
    }
    catch(e){
        this.statusCode = 422; //todo: distinguish between client-errors and server errors
        this.body = responseEnvelopeHelper.buildErrorEnvelope(e,422);
    }
}
function *searchByName(next){
    try {
        var searchParams  = searchParamFactory.searchBusinessesByName(this.query);
        var businesses = yield app.repositories.Business.searchByName(searchParams);
        this.body = responseEnvelopeHelper.buildCollectionResponseEnvelope(businesses)
    }
    catch(e){
        this.statusCode = 422; //todo: distinguish between client-errors and server errors
        this.body = responseEnvelopeHelper.buildErrorEnvelope(e,422);
    }
}


module.exports = exports;
exports.findById = findById;
exports.search = search;
exports.searchByName = searchByName;