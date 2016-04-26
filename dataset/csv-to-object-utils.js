var fs = require('fs');
var Q = require('Q');
var parse = require('csv').parse;


function turnListOfArraysIntoObject(keys,objects){

    var results = [];
    for (var i = 0; i < objects.length; i++){
        var row = objects[i];

        var result = {};
        for (var j = 0; j < row.length; j++){
            var val = row[j];
            var key = keys[j];
            result[key] = val;
        }
        results.push(result);
    }
    return results;

}

function readCSVFileToObjects(fileName){

    var deferred = Q.defer();

    Q.nfcall(fs.readFile, fileName, "utf-8")
        .then(readCsvFilePromise)
        .then(function(arrayOfArrays){

            var keys = arrayOfArrays[0];
            var rest = arrayOfArrays.slice(1);
            var results = turnListOfArraysIntoObject(keys,rest);
            deferred.resolve(results);
        });

    return deferred.promise;
}
function readCsvFilePromise(text){
    var deferred = Q.defer();

    parse(text,{comment: '#'},function(err,response){

        deferred.resolve(response);
    });
    return deferred.promise;

}

module.exports = exports;
exports.readCSVFileToObjectsPromise = readCSVFileToObjects;