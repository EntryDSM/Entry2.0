const router = require('express').Router();

const userRouter = require('./user/router');
const applyDataRouter = require('./applyData/router');
const schoolRouter = require('./school/router');


router.use('/api', userRouter, applyDataRouter, schoolRouter);

module.exports = router;