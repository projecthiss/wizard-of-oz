const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userInputSchema = new Schema({
    usercode:{type: String, required:true},
    systemId: {required: true, type: String},
    ticketId: {required: true, type: String},
    group: {required: true, type: String},
    defaultHighlighting: {type: Object, required: true},
    givenHighlighting: {type: Object, required: true},
    feedback: {
        solutionId_one: {required: true, type: String},
        solutionFeedback_one: {required: true, type: Number},

        solutionId_two: {required: true, type: String},
        solutionFeedback_two: {required: true, type: Number},

        solutionId_three: {required: true, type: String},
        solutionFeedvack_three: {required: true, type: Number},
        }
})

const userInput = mongoose.model('userInput', userInputSchema);
module.exports = {
    userInput
}

