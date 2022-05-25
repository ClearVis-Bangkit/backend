const { userHistory } = require('../models/tabelmodels');

const postHistoryHandler = async (req, res) => {
    await userHistory.create({
        userId: req.body.userId,
        image: req.file.path
    })
    res.json({msg: 'success'})
}

const getHistoryHandler = async (req, res) => {
    const historyUser = await userHistory.findAll({
        where: {
            userId: req.query.userId,
        }
    })
    res.json({status: true, data: historyUser});
}

module.exports = {
    postHistoryHandler,
    getHistoryHandler
}