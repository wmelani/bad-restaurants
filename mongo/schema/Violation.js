var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var violation = new Schema({
    "date" : Date,
    "violationTypeId" : String,
    "riskCategory" : String,
    "description" : String
});

//"business_id","date","ViolationTypeID","risk_category","description"
exports.ViolationSchema = violation;