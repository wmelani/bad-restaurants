var dateUtilities = require('../utilities/dateUtilities');
function create (object) {
    var model = {
        "businessId" : object.business_id,
        "date" : dateUtilities.formatDateString(object.date),
        "violationTypeId" : object.ViolationTypeId,
        "riskCategory" : object.riskCategory,
        "description" : object.description
    };
    return model;
}
module.exports = exports;
exports.create = create;

