var mongoose = require('mongoose');
var database = {};
database.init = function (app, config) {
    connect(app, config);
}

function connect(app, config) {

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ENTRYDSM_DB_URL);
    database.connection = mongoose.connection;
    database.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.connection.on('open', function () {
        console.log('CONNECTED TO DATABASE');

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