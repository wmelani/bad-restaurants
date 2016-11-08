const mongoose = require('mongoose');
const Q = require('q');

function connect(configuration) {
    const deferred = Q.defer();

    mongoose.connect(createMongoString(configuration));
    mongoose.set('debug', true);
    const db = mongoose.connection;


    db.on('error', function (e) {
        console.log("error connecting", e);
        deferred.reject(e);
    });
    db.on('open', function () {
        deferred.resolve(db);
    });
    return deferred.promise;
}


function createMongoString(configuration) {
    let url = 'mongodb://';
    if (configuration.username && configuration.password) {
        url += configuration.username + ":" + configuration.password + "@";
    }

    return url + configuration.host + ":" + configuration.port + "/" + configuration.name;
}

module.exports = exports;
exports.connect = connect;