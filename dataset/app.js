const _ = require('lodash');
const path = require('path');
const Q = require('q');
const csvToObjectUtils = require('./utilities/csv-to-object-utils');
const businessFactory = require('./factories/BusinessFactory');
const mongoConnection = require('../mongo/mongoConnection');


function createBusinessRecords() {
    const deferred = Q.defer();

    const businessesPromise = csvToObjectUtils.readCSVFileToObjectsPromise(path.resolve(__dirname,'../resources/businesses_plus.csv'));
    const inspectionsPromise = csvToObjectUtils.readCSVFileToObjectsPromise(path.resolve(__dirname,'../resources/inspections_plus.csv'));
    const violationsPromise = csvToObjectUtils.readCSVFileToObjectsPromise(path.resolve(__dirname,'../resources/violations_plus.csv'));

    Q.all([businessesPromise,inspectionsPromise,violationsPromise]).then(function(x){
        const businesses = x[0];
        const inspections = x[1];
        const violations = x[2];


        const groupedInspections = _.groupBy(inspections,"business_id");
        const groupedViolations = _.groupBy(violations,"business_id");

        var businessModels = [];
        for (let i = 0; i < businesses.length; i++){
            let business = businesses[i];

            let inspectionsForBusiness = groupedInspections[business.business_id];
            let violationsForBusiness = groupedViolations[business.business_id];
            let model = businessFactory.create(business,inspectionsForBusiness,violationsForBusiness);
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
            const promises = [];
            for (let i = 0; i < businessRecords.length; i++){
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
const app = this;