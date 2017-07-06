module.exports = {
    server_port: 8080,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [{
            file: './models/userModel',
            modelName: 'userModel'
        }
        // file : schema path
        // modelName : schema model name
    ]
}
