const Feedback = require('../../database/models/Feedback');

exports.postFeedback = (req, res) => {
    const writer = req.session.key;
    const { title, contents, uploads } = req.body;

    Feedback.create(writer, title, contents, uploads)
        .then(feedback => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}