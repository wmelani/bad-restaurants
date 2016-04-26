
function buildErrorEnvelope(error,httpStatus){
    return __buildEnvelope(
            [error.message + "\n\n\n\n" + error.stack],//todo: not show stack if not debugging
            httpStatus ? httpStatus : 500)
        ;
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