var mongoose = require('mongoose');
var database = {};
database.init = function(app, config) { //단순히 connect함수를 호출해 주기 위한 함수
    console.log('init() 호출됨.');
    connect(app, config);
}

function connect(app, config) { //연결부분
    console.log('connect() 호출됨.');

    mongoose.Promise = global.Promise;
    // mongoose의 Promise 객체는 global의Promise객체사용하도록 함
    mongoose.connect(config.db_url);
    database.db = mongoose.connection;
    database.db.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.db.on('open', function() {
        console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);

        createSchema(app, config);

    });
    database.db.on('disconnected', connect);
}

// 설정에서 해준 db.schemas에서 스키마 생성 단 직접생성X 각 사용별로 재정의해준다.
function createSchema(app, config) {
    var schemaLen = config.db_schemas.length; //스키마의 수를 카운트
    console.log('설정에 정의된 스키마의 수 : %d', schemaLen);

    for (var i = 0; i < schemaLen; i++) { //curItem이라는 배열에 설정 에서 해준 스키마 수만큼 값을 받아준다.
        var curItem = config.db_schemas[i];

        // 모듈 파일에서 모듈 불러온 후 createSchema() 함수 호출하기
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('%s 모듈을 불러들인 후 스키마 정의함.', curItem.file);
        // User 모델 정의
        var curModel = mongoose.model(curItem.collection, curSchema);
        console.log('%s 컬렉션을 위해 모델 정의함.', curItem.collection);
        // database 객체에 속성으로 추가
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
        console.log('스키마 이름 [%s], 모델 이름 [%s] 이 database 객체의 속성으로 추가됨.', curItem.schemaName, curItem.modelName);
    }
    app.set('database', database);
    console.log('database 객체가 app 객체의 속성으로 추가됨.');
}

module.exports = database;