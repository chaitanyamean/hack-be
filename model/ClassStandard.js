const mongoose = require('mongoose');


const classStandardSchema = new mongoose.Schema({
    classStd: {
        type: String,
        default: null
    },
    classStdId: {
        type: String,
    }
})


module.exports = mongoose.model("classStandard", classStandardSchema);