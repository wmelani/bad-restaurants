
function registerRoutes(app){

    app.router.get('/api/business/:id', app.controllers.Business.findById);
    app.router.get('/api/business/search', app.controllers.Business.search);
    app.router.get('/api/business/search-by-name', app.controllers.Business.searchByName);
}
module.exports = exports;
exports.registerRoutes = registerRoutes;

