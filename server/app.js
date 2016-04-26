
var app = {};

app.config = require('../config');

app.controllers = {};
app.repositories = {};
app.models = {};
app.models.Business = require('../mongo/schema/Business').BusinessService;

function run(){
    app.logger = require('./logger').create(__dirname);
    app.logger.info("App started");
    app.controllers.Business = require('./controllers/business');
    app.repositories.Business = require('./repositories/business');
    require('./koa').register(app);
    require('./routes').registerRoutes(app);
    require('../mongo/mongoConnection').connect(app.config.database);

}

module.exports = exports = app;
app.run = run;
