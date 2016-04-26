module.exports = exports;

function formatDateString(date){
    if (date == null){
        return null;
    }
    return date.substr(0,4) + '-' + date.substr(4,2) + "-" + date.substr(6,2);
}

exports.formatDateString = formatDateString;