var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inspection = new Schema({
    "score" : Number,
    "date" : Date,
    "type" : String
});

//"business_id","Score","date","type"
exports.InspectionSchema = inspection;