
let config = {
    server_port: 8080,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [{
            "file": './models/userModel',
            "modelName": 'userModel'
        },
        {
            "file": './models/userInfoModel',
            "modelName": 'userInfoModel'
        },
        {
            "file": './models/userIntroduceModel',
            "modelName": 'userIntroduceModel'
        },
        {
            "file": './models/applydataModel',
            "modelName": 'applydataModel'
        }
        // file : schema path
        // modelName : schema model name
    ],
    pages: [{
        "name": "input2",
        "url": "/input2"
    },
    {
        "name" : "input3",
        "url" : "/input3"
    }
    ],
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