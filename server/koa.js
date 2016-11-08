const serve = require('koa-static');
const koa = require('koa')();
const router = require('koa-router')();



function register(app){

    koa.use(router.routes())
        .use(router.allowedMethods())
        .use(serve(app.config.paths.static));

    koa.listen(app.config.server.port);
    console.log("server listening on " + app.config.server.port);
    app.koa = koa;
    app.router = router;
}

module.exports = exports;
exports.register = register;