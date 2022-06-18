const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        default: null
    },
    cost: {
        type: Number,
        default: null
    },
    changeBy: {
        type: String,
    },
    serviceId: {
        type: String,
    }
})


module.exports = mongoose.model("service", serviceSchema);