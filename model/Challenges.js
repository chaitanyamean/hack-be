const mongoose = require("mongoose");

const challengesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
  },
  createdDate: {
    type: String,
  },
  challengeId: {
    type: String,
  },
  employeeId: {
    type: String,
  },
});

module.exports = mongoose.model("challenges", challengesSchema);
