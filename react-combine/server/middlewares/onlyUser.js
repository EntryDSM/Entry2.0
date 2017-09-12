module.exports = (req, res, next) => {
    if (!req.session.key) return res.status(401).end();
    else return next();
}