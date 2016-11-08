const NodeGeocoder = require('node-geocoder');
const app = require('../app');
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: app.config.apis["google-maps"]
};
const geocoder = NodeGeocoder(options);
const Q = require('q');

function findLatLong(businesses){
    const deferred = Q.defer();
    let businessesMissingLocationInfo = businesses.filter(function(x){
        return x.location.coordinates == null;
    });
    
    let names =
        businessesMissingLocationInfo.map(function(x) {

            return x.location.address
                    + " "
                    + (typeof x.location.city === "undefined" ? app.config.defaults.city : x.location.city)
                    + " "
                    + x.location.postalCode
                    + " "
                    + (typeof x.location.country === "undefined" ? app.config.defaults.country : x.location.country)
        });

    geocoder.batchGeocode(names, function (err, results) {
        if (err){
            deferred.reject(err);
        }
        for (let i = 0; i < results.length; i++){
            let business = businessesMissingLocationInfo[i];
            let result = results[i];
            if (!result.error){
                console.log("found lat/long for " + business.name);
                business.location.coordinates = [result.value.longitude, result.value.latitude];
            }else {
                console.log(result.error);
                console.log("could not find lat/long for " + business.name, " searched by ", names[i]);
            }
        }
        businessesMissingLocationInfo = businesses.filter(function(x){
            return x.location.coordinates == null;
        });
        console.log("still lat/long is missing for " + businessesMissingLocationInfo.length + " items");
        deferred.resolve(businesses);
    });
    return deferred.promise;

}

module.exports = exports;
exports.findLatLong = findLatLong;
