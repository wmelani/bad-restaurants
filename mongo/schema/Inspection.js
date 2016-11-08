const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspection = new Schema({
    "score" : Number,
    "date" : Date,
    "type" : String
});

exports.InspectionSchema = inspection;