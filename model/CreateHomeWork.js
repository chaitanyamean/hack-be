const mongoose = require('mongoose');


const createHomeWorkSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    classStd: {
        type: String,
        default: null
    },
    type: {
        type: String,
    },
    homeworkId: {
        type: String,
    },
    assignedDate: {
        type: String,
    },
    url: {
        type: String,
    }
})


module.exports = mongoose.model("createHomeWork", createHomeWorkSchema);