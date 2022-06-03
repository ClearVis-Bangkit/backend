const router = require('express').Router();
const { getArticlesHandler } = require('../controller/artikel');

router.get('/artikels', getArticlesHandler)


module.exports = router;
    