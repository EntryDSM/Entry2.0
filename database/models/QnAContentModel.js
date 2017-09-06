var mongoose = require("mongoose");
var schema = require("../schemas/QnAContent");


schema.static('searchMyQnA', function(key, callback) {
    let response = [];
    this.find({
        author: key
    }, function(err, docs) {
        let search = new Promise(function(resolve, reject) {
            for (var i = 0; i < docs.length; i++) {
                let object = {
                    "title": docs[i].title,
                    "index": docs[i].index,
                    "date": docs[i].date
                }
                response.push(object);
            }
            resolve();
        }).then(function() {
            callback(response);
        }).catch(function() {
            console.log("search rejected");
        });
    });
});

schema.static('findByQna', function(id, callback) {
    return this.find({ author: id }, callback);
});

var model = mongoose.model('QnAContent', schema);

module.exports = model;