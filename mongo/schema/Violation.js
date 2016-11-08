const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const violation = new Schema({
    "date" : Date,
    "violationTypeId" : String,
    "riskCategory" : String,
    "description" : String
});

exports.ViolationSchema = violation;