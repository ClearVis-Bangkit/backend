const { userHistory } = require('../models/tabelmodels');

const postHistoryHandler = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).json({success: false, msg: 'User ID tidak ditemukan'});
    }
    if (!req.body.status) {
        return res.status(400).json({success: false, msg: 'Status tidak ditemukan'});
    }
    if (!req.files) {
        return res.status(400).json({success: false, msg: 'Gambar tidak ditemukan'});
    }
    
    const file = req.files.image;
    const path = "historyPhoto/" + Date.now() + file.name;
    const allowedExtension = ['image/png','image/jpg','image/jpeg'];

    if(!allowedExtension.includes(file.mimetype)){
        return res.status(422).json({success: false, msg: 'Hanya mendukung format png, jpg, dan jpeg'});
    }

    file.mv(path, async (err) => {
        if (err) {
            return res.status(500).json({success: false, msg: err})
        }
        try {
            await userHistory.create({
                userId: req.body.userId,
                status: req.body.status,
                image: path
            })
            return res.status(201).json({status: true})
        } catch (err) {
            return res.status(501).json({status: false, msg: 'Server errors'})
        }
    }) 
}

const getHistoryHandler = async (req, res) => {
    const historyUser = await userHistory.findAll({
        where: {
            userId: req.query.userId,
        }
    })
    return res.json({status: true, data: historyUser});
}

module.exports = {
    postHistoryHandler,
    getHistoryHandler
}