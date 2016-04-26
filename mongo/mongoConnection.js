var mongoose = require('mongoose');
var Q = require('q');





function connect(configuration) {
    var deferred = Q.defer();

    mongoose.connect(createMongoString(configuration));
    mongoose.set('debug', true);
    var db = mongoose.connection;


    db.on('error', function (e) {
        deferred.reject(e);
    });
    db.on('open', function () {
        deferred.resolve(db);
    });
    return deferred.promise;
}


function createMongoString(configuration) {
    var url = 'mongodb://';
    if (configuration.username && configuration.password) {
        url += configuration.username + ":" + configuration.password + "@";
    }

    return url + configuration.host + ":" + configuration.port + "/" + configuration.name;
}

module.exports = exports;
exports.connect = connect;