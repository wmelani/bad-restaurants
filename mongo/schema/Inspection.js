const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspection = new Schema({
    "score" : Number,
    "date" : Date,
    "type" : String
});

//"business_id","Score","date","type"
exports.InspectionSchema = inspection;