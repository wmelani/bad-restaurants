const _ = require('lodash');

function formatDateString(date) {
    if (date == null) {
        return null;
    }
    return date.substr(0, 4) + '-' + date.substr(4, 2) + "-" + date.substr(6, 2);

}
function sortRecordsOnDate(records, dateKey){
    return _.sortBy(records, function (value) {
        return new Date(value[dateKey]);
    });
}


module.exports = exports;
exports.formatDateString = formatDateString;
exports.sortRecordsOnDate = sortRecordsOnDate;