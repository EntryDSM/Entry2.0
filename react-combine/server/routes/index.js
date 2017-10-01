const router = require('express').Router();

const userRouter = require('./user/router');
const applyDataRouter = require('./applyData/router');
const schoolRouter = require('./school/router');
const feedbackRouter = require('./feedback/router');

router.use('/api', userRouter, applyDataRouter, schoolRouter, feedbackRouter);

module.exports = router;