const router = require('express').Router();
const { historyHandler } = require('../controller/postHistory');
const { verifyToken } = require('../middleware/verifyToken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './historyPhoto');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    } 
})
const upload = multer({storage: storage})

router.post('/', verifyToken, upload.single('image'), historyHandler);


module.exports = router;