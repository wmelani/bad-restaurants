const mongoose = require('mongoose');
const inspectionModel = require('./Inspection').InspectionSchema;
const violationModel = require('./Violation').ViolationSchema;

const Schema = mongoose.Schema;

const business = new Schema({
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
business.index({ name: "text" });
exports.BusinessService = mongoose.model('Business', business);