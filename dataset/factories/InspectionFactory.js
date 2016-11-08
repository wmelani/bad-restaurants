const dateUtilities = require('../utilities/dateUtilities');
function create (object) {
    return {
        "businessId": object.business_id,
        "date": dateUtilities.formatDateString(object.date),
        "score": object.Score == "" ? null : parseInt(object.Score),
        "type": object.type
    };
}


module.exports = exports;
exports.create = create;

