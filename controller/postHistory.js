const { userHistory } = require('../models/tabelmodels');

const historyHandler = async (req, res) => {
    await userHistory.create({
        userId: req.body.userId,
        image: req.file.path
    })
    res.json({msg: 'success'})
}

module.exports = {
    historyHandler,
}