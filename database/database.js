var mongoose = require('mongoose');
var database = {};
database.init = function (app, config) {
    connect(app, config);
}

function connect(app, config) {

    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database.connection = mongoose.connection;
    database.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.connection.on('open', function () {
        console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);

        createSchema(app, config);

    });
    database.connection.on('disconnected', connect);
}

function createSchema(app, config) {
    var schemaLen = config.db_schemas.length;

    for (var i = 0; i < schemaLen; i++) {
        let schemaInfo = config.db_schemas[i];
        let model = require(schemaInfo.file);
        let modelName = schemaInfo.modelName;
        database[modelName] = model;
        console.log(modelName+" -> "+model.collection.name);
    }
    app.set('database', database);
}

module.exports = database;