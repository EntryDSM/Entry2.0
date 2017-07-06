var mongoose = require('mongoose');
var database = {};
database.init = function (app, config) {
    connect(app, config);
}

function connect(app, config) {

    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database.db = mongoose.connection;
    database.db.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.db.on('open', function () {
        console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);

        createSchema(app, config);

    });
    database.db.on('disconnected', connect);
}

function createSchema(app, config) {
    var schemaLen = config.db_schemas.length;

    for (var i = 0; i < schemaLen; i++) {
        var curItem = config.db_schemas[i];

        var curSchema = require(curItem.file).createSchema(mongoose);
        var curModel = mongoose.model(curItem.collection, curSchema);
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
    }
    app.set('database', database);
}

module.exports = database;