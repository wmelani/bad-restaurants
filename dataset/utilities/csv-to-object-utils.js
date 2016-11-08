const fs = require('fs');
const Q = require('Q');
const parse = require('csv').parse;


function turnListOfArraysIntoObject(keys,objects){

    const results = [];
    for (let i = 0; i < objects.length; i++){
        let row = objects[i];

        let result = {};
        for (let j = 0; j < row.length; j++){
            let val = row[j];
            let key = keys[j];
            result[key] = val;
        }
        results.push(result);
    }
    return results;

}

function readCSVFileToObjects(fileName){

    const deferred = Q.defer();

    Q.nfcall(fs.readFile, fileName, "utf-8")
        .then(readCsvFilePromise)
        .then(function(arrayOfArrays){

            const keys = arrayOfArrays[0];
            const rest = arrayOfArrays.slice(1);
            const results = turnListOfArraysIntoObject(keys,rest);
            deferred.resolve(results);
        },rej => console.log(rej));

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