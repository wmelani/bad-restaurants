var businessSchema = require('../../mongo/schema/Business.js');



var inspectionsFactory = require('./InspectionFactory');
var violationsFactory = require('./ViolationFactory');

function create (business, inspections,violations) {
    var model = {
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
        for (var i = 0; i < inspections.length; i++){
            var inspection = inspectionsFactory.create(inspections[i]);
            model.inspections.push(inspection);
        }
    }
    if (violations){
        model.violations = [];
        for (var i = 0; i < violations.length; i++){
            var violation = violationsFactory.create(violations[i]);
            model.violations.push(violation);
        }
    }
    return new businessSchema.BusinessService(model);
}
module.exports = exports;
exports.create = create;

