var NodeGeocoder = require('node-geocoder');
var app = require('../app');
var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: app.config.apis["google-maps"]
};
var geocoder = NodeGeocoder(options);
var Q = require('q');

function findLatLong(businesses){
    var deferred = Q.defer();
    var businessesMissingLocationInfo = businesses.filter(function(x){
        return x.location.coordinates == null;
    });
    
    var names =
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
        for (var i = 0; i < results.length; i++){
            var business = businessesMissingLocationInfo[i];
            var result = results[i];
            if (!result.error){
                console.log("found lat/long for " + business.name);
                business.location.coordinates = [result.value.longitude, result.value.latitude];
            }else {
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
