function searchBusinesses(params){
    var defaults = { //todo: put in config file
        "lat" : undefined,
        "long" : undefined,
        "radius" : 500,
        "limit" : 25,
        "minimum" : 0,
        "maximum" : 100
    };

    return Object.assign({},defaults, params);
}
function searchBusinessesByName(params){
    var defaults = {
        "limit" : 25,
        "name" : undefined
    };

    return Object.assign({},defaults, params);
}

module.exports = exports;
exports.searchBusinesses = searchBusinesses;
exports.searchBusinessesByName = searchBusinessesByName;