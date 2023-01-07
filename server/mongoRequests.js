const mongoose = require("./mongoConnection").mongoose
const model = require('./mongoModel')

const feedbackToDatabase = (req, res,) => {
    const feedback = req.body.feedback
    model.userInput.update({usercode: feedback.usercode, systemId: feedback.systemId}, feedback, {
        upsert: true,
        setDefaultsOnInsert: true
    }, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
        return res.status(200).json({
            "message": "Ticket saved"
        });
    })
}

module.exports = {
    feedbackToDatabase
}