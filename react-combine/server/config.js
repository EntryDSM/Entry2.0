
let config = {

    server_port: process.env.ENTRYDSM_PORT,
    db_url: process.env.ENTRYDSM_DB_URL,
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
    server_domain: process.env.ENTRYDSM_DOMAIN
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