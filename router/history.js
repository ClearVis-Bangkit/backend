const router = require('express').Router();
const { postHistoryHandler, getHistoryHandler } = require('../controller/history');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, postHistoryHandler);
router.get('/', verifyToken, getHistoryHandler)


module.exports = router;
