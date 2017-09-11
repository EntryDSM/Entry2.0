const router = require('express').Router();

const userRouter = require('./user/router');
const applyDataRouter = require('./applyData/router');
const schoolRouter = require('./school/router');
const QnARouter = require('./QnA/router');


router.use('/api', userRouter, applyDataRouter, schoolRouter, QnARouter);

module.exports = router;