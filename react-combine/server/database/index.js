var mongoose = require('mongoose');

module.exports = () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ENTRYDSM_DB_URL);
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', function () {
        console.log('CONNECTED TO DATABASE');
    });
    mongoose.connection.on('disconnected', ()=>{
        console.log('DISCONNECTED FROM DATABASE')
    });
}