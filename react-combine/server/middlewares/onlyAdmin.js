const Admin = require('../database/models/Admin');
const crypto = require('crypto');

module.exports = (req, res, next) => {
    if (!req.session.key) {
        res.send('<script>alert("접근권한이 없습니다. 관리자로 로그인해주세요.");location.href="/admin/login";</script>');
        res.end();
    } else {
        Admin.findById(req.session.key)
            .then(admin => {
                if (!admin) {
                    res.send('<script>alert("접근권한이 없습니다. 관리자로 로그인해주세요.");location.href="/admin/login";</script>');
                    res.end();
                } else {
                    req.isSuper = admin.isSuper;
                    next();
                }
            })
    }

}