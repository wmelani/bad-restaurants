function sanitizeInputParams(defaults, params) {
    let result = {};
    for (let prop in defaults) {
        if (typeof params[prop] !== "undefined") {
            result[prop] = params[prop];
            if (typeof defaults[prop] === "number") {
                result[prop] = parseInt(result[prop]);
            }
            continue;
        }
        result[prop] = defaults[prop];
    }
    return result;
}
function searchBusinesses(params){
    const defaults = { //todo: put in config file
        "lat" : undefined,
        "long" : undefined,
        "radius" : 500,
        "limit" : 25,
        "minimum" : 0,
        "maximum" : 100
    };
    return sanitizeInputParams(defaults, params);

}
function searchBusinessesByName(params){
    const defaults = {
        "limit" : 25,
        "name" : undefined
    };
    return sanitizeInputParams(defaults, params);

}

module.exports = exports;
exports.searchBusinesses = searchBusinesses;
exports.searchBusinessesByName = searchBusinessesByName;