const router = require('express').Router();
const { regisHandler, loginHandler, logoutHandler } = require('../controller/user');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/register', regisHandler);
router.post('/login', loginHandler);
router.delete('/logout', logoutHandler);
router.get('/', verifyToken);

module.exports = router;