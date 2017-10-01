const SchoolCode = require('../../database/models/SchoolCode');

exports.search = (req, res) => {
    const name = req.query.name;
    const goverment = req.query.goverment;
    search(name, goverment)
        .then((schools) => {
            res.status(200).json(schools);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

function search(name, goverment) {
    return new Promise((resolve, reject) => {
        let search = {};
        if (typeof name !== "undefined") search.name = new RegExp(name.split('').join('.{0,}'));
        if (typeof goverment !== "undefined") search.goverment = goverment;

        resolve(SchoolCode.find(search, {
            "_id": false,
            "name": true,
            "code": true,
            "goverment": true
        }).exec());
    });
}