const School = require('../../database/models/School');

exports.search = (req, res) => {
    const name = req.query.name;
    const goverment = req.query.goverment;
    console.log(name);
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
        if (typeof name !== "undefined") search.name = name;
        if (typeof goverment !== "undefined") search.goverment = goverment;

        return School.find(search, {
            "name": true,
            "code": true,
            "goverment": true
        }).exec();
    });
}