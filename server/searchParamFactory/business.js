function searchBusinesses(params){
    var defaults = { //todo: put in config file
        "lat" : undefined,
        "long" : undefined,
        "radius" : 500
        //todo: add paging parameters
    };

    var keys = Object.keys(defaults);
    var result = {};
    for (var j = 0; j < keys.length; j++){
        var key = keys[j];
        result[key] = params[key] == undefined ? defaults[key] : params[key];
    }
    return result;
}


module.exports = exports;
exports.searchBusinesses = searchBusinesses;