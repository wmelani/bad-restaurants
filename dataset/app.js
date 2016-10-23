var _ = require('lodash');
var Q = require('q');
var csvToObjectUtils = require('./csv-to-object-utils');
var businessFactory = require('./factories/BusinessFactory');
var mongoConnection = require('../mongo/mongoConnection');


function createBusinessRecords() {
    var deferred = Q.defer();

    var businessesPromise = csvToObjectUtils.readCSVFileToObjectsPromise(__dirname + '/businesses_plus.csv');
    var inspectionsPromise = csvToObjectUtils.readCSVFileToObjectsPromise(__dirname + '/inspections_plus.csv');
    var violationsPromise = csvToObjectUtils.readCSVFileToObjectsPromise(__dirname + '/violations_plus.csv');





    Q.all([businessesPromise,inspectionsPromise,violationsPromise]).then(function(x){

        var businesses = x[0];
        var inspections = x[1];
        var violations = x[2];


        var groupedInspections = _.groupBy(inspections,"business_id");
        var groupedViolations = _.groupBy(violations,"business_id");

        var businessModels = [];
        for (var i = 0; i < businesses.length; i++){
            var business = businesses[i];

            var inspectionsForBusiness = groupedInspections[business.business_id];
            var violationsForBusiness = groupedViolations[business.business_id];
            var model = businessFactory.create(business,inspectionsForBusiness,violationsForBusiness);
            businessModels.push(model);
        }
        deferred.resolve(businessModels);
    });
    return deferred.promise;
}
function saveToMongo(businessRecords){
    var deferred = Q.defer();
    mongoConnection.connect(app.config.database)
        .then(function(database){
           app.database = database;
            var promises = [];
            for (var i = 0; i < businessRecords.length; i++){
                promises.push(kickOffSavePromise(businessRecords[i]))
            }
            Q.all(promises).then(function(x){
               deferred.resolve(x);
            });
        });

    return deferred.promise;
}
function decorateWithLocationData(businesses){
    return require('./utilities/latLongDecorator').findLatLong(businesses);
}
function kickOffSavePromise(business){
    return business.save();
}
function run(){
    createBusinessRecords()
        .then(decorateWithLocationData)
        .then(saveToMongo)
        .then(function() {
            console.log("Finished");
           process.exit();
        });
    
}
module.exports = exports;
exports.run = run;
var app = this;