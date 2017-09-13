var mongoose = require('mongoose');
const backup = require('mongodb-backup');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ENTRYDSM_DB_URL);
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', function () {
        console.log('CONNECTED TO DATABASE');
        setInterval(() => {
            backup({
                uri: 'mongodb://localhost:27017/EntryDSM',
                root: __dirname + '/../../DB-EntryDSM'
            });
        }, 60 * 60 * 1000)
    });
    mongoose.connection.on('disconnected', () => {
        console.log('DISCONNECTED FROM DATABASE')
    });
}