var winston = require('winston');


function create(logDir){
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ json: false, timestamp: true }),
            new winston.transports.File({ filename: logDir + '/debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true }),
            new winston.transports.File({ filename: logDir + '/exceptions.log', json: false })
        ],
        exitOnError: false
    });
    return logger;
}

module.exports = exports;
exports.create = create;