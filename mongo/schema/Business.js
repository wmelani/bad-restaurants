var mongoose = require('mongoose');
var inspectionModel = require('./Inspection').InspectionSchema;
var violationModel = require('./Violation').ViolationSchema;

var Schema = mongoose.Schema;

var business = new Schema({
    "id" : mongoose.Schema.Types.ObjectId,
    "name" : String,
    "businessId" : String,
    "phoneNumber" : String,
    "location" : {
        "postalCode" : String,
        "address" : String,
        "coordinates" : {
            type: [Number]
        }
    },
    "ownerLocation" : {
        "name" : String,
        "address" : String,
        "city" : String,
        "state" : String,
        "postalCode" : String
    },
    "legal" : {
        "taxCode" : String,
        "businessCertificate" : String,
        "applicationDate" : String
    },
    "currentScore" : Number,
    "inspections" : [ inspectionModel],
    "violations" : [ violationModel ]
});
business.index({ "location.coordinates" : "2dsphere"});

exports.BusinessService = mongoose.model('Business', business);