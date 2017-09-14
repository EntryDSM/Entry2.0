var mongoose = require('mongoose');
const cmd = require('node-cmd');

module.exports = () => {
    const db_host = process.env.ENTRYDSM_DB_URL.split(':')[1].slice(2);
    const db_port = process.env.ENTRYDSM_DB_URL.split(':')[2].split('\/')[0];
    const db_name = process.env.ENTRYDSM_DB_URL.split('\/')[3];

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ENTRYDSM_DB_URL);
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', function () {
        console.log('CONNECTED TO DATABASE');
        setInterval(() => {
            console.log('DATABASE BACKED UP');
            cmd.run(`mongodump --out ${__dirname + '/../../../../DB-EntryDSM'} --host ${db_host} --port ${db_port} --db ${db_name}`)
        }, 60 * 60 * 1000)
    });
    mongoose.connection.on('disconnected', () => {
        console.log('DISCONNECTED FROM DATABASE')
    });
}