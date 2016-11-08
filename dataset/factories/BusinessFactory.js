const businessSchema = require('../../mongo/schema/Business.js');
const inspectionsFactory = require('./InspectionFactory');
const violationsFactory = require('./ViolationFactory');
const dateUtilities = require('../utilities/dateUtilities');


function create (business, inspections,violations) {
    const model = {
        "businessId" : business.business_id,
        "phoneNumber" : business.phone_number,
        "name" : business.name,
        "location" : {
            "address" : business.address,
            "city" : business.city,
            "postalCode" : business.postal_code
        },
        "ownerLocation" : {
          "address" : business.owner_address,
            "city" : business.owner_city,
            "state": business.owner_state,
            "postalCode": business.owner_zip,
            "name" : business.owner_name
        },
        "legal" : {
            "taxCode" : business.TaxCode,
            "businessCertificate" : business.business_certificate,
            "applicationDate" : business.applicationDate
        }

    };
    if (business.longitude && business.latitude){
        model.location.coordinates = [business.longitude, business.latitude];//order is important for structure
    }
    if (inspections){
        model.inspections = [];
        for (let i = 0; i < inspections.length; i++){
            let inspection = inspectionsFactory.create(inspections[i]);
            model.inspections.push(inspection);
        }
        model.currentScore = getCurrentScore(model.inspections);
    }
    if (violations){
        model.violations = [];
        for (let i = 0; i < violations.length; i++){
            let violation = violationsFactory.create(violations[i]);
            model.violations.push(violation);
        }
    }
    return new businessSchema.BusinessService(model);
}
function getCurrentScore(inspections){
    var sortedRecords = dateUtilities.sortRecordsOnDate(inspections,"date").reverse();
    for (let i = 0; i < sortedRecords.length; i++){
        let current = sortedRecords[i];
        if (current.score !== null){
            return current.score;
        }
    }
    return null;
}

module.exports = exports;
exports.create = create;

