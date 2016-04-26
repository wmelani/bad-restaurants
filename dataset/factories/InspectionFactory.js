var dateUtilities = require('../utilities/dateUtilities');
function create (object) {
    var model = {
        "businessId" : object.business_id,
        "date" : dateUtilities.formatDateString(object.date),
        "score" : object.Score == "" ? null : parseInt(object.Score),
        "type" : object.type
    };
    return model;
}


module.exports = exports;
exports.create = create;

