const app = {};

app.config = require('../config');

app.controllers = {};
app.repositories = {};
app.models = {};
app.models.Business = require('../mongo/schema/Business').BusinessService;

function run(){
    if (app.__initialized){
        throw new Error("app was already initialized");
    }
    app.logger = require('./logger').create(app.config.paths.logs);
    app.logger.info("App started");
    app.controllers.Business = require('./controllers/business');
    app.repositories.Business = require('./repositories/business');
    require('./koa').register(app);
    require('./routes').registerRoutes(app);
    require('../mongo/mongoConnection').connect(app.config.database);
    app.__initialized = true;

}

module.exports = exports = app;
app.run = run;
