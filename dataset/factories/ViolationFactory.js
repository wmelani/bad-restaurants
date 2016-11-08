const dateUtilities = require('../utilities/dateUtilities');
function create (object) {
    return {
        "businessId": object.business_id,
        "date": dateUtilities.formatDateString(object.date),
        "violationTypeId": object.ViolationTypeId,
        "riskCategory": object.riskCategory,
        "description": object.description
    };
}
module.exports = exports;
exports.create = create;

