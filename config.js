
let config = {

    server_port: 3000,
    db_url: 'mongodb://localhost:27017/EntryDSM',
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
        }
        // file : schema path
        // modelName : schema model name
    ],
    pages: [{
        "name": "info",
        "url": "/info"
    },
    {
        "name" : "score",
        "url" : "/score"
    },
    {
        "name" : "introduce",
        "url" : "/introduce"
    }],
    server_domain: 'http://localhost'
}

config.getPageUrl = function (name) {
    for (var i = 0; i < this.pages.length; i++) {
        if (this.pages.name = name) return this.pages.name;
    }
    return null;
}

config.getRootPath = function(){
    return __dirname;
}

config.getServerDomain = function(){
  return this.server_domain + ':' + this.server_port;
}

module.exports = config;