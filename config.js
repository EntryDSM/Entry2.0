module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [{
            file: './user_schema',
            collection: 'EntryDsmTest',
            schemaName: 'Schema',
            modelName: 'Model'
        }
        //file:스키마 파일 , collection:컬렉션 이름 지정,
        //schemaName:반환된 객체를 어떤 속성이름으로할껀지 , modelName:모델 객체를 만든후 어떤이름
    ]
}
