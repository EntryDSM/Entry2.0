
let config = {
    db_schemas: [{
            "file": './models/userModel',
            "modelName": 'userModel'
        },
        {
            "file": './models/applyDataModel',
            "modelName": 'applyDataModel'
        },
        {
            "file" : './models/schoolModel',
            "modelName" : 'schoolModel'
        },
        {
            "file" : './models/QnAContentModel',
            "modelName" : 'QnAContentModel'
        }
        // file : schema path
        // modelName : schema model name
    ]
}

config.getRootPath = function(){
    return __dirname;
}


module.exports = config;