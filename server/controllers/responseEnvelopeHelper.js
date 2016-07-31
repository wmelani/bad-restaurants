
function buildErrorEnvelope(error,httpStatus){
    var formattedError = error.message;
    if(process.env.NODE_ENV === "Debug"){
        formattedError += "\n\n\n\n" + error.stack;
    }

    return __buildEnvelope([formattedError],httpStatus ? httpStatus : 500);
}
function buildSingleResponseEnvelope(obj,httpStatus){
    return __buildEnvelope(undefined,httpStatus ? httpStatus : 200,obj);
}
function buildCollectionResponseEnvelope(listOfObj,httpStatus){
    return __buildEnvelope(undefined, httpStatus ? httpStatus : 200, {
        "results": listOfObj,
        "total": listOfObj.length
    });
}

function __buildEnvelope(errors,httpStatus,body){
    return {
        "errors" : errors,
        "httpStatus" :httpStatus,
        "resource" : body
    };
}


module.exports = exports;
exports.buildErrorEnvelope = buildErrorEnvelope;
exports.buildSingleResponseEnvelope = buildSingleResponseEnvelope;
exports.buildCollectionResponseEnvelope = buildCollectionResponseEnvelope;