const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    form: String,
    type: String,
    description: String
})

module.exports = mongoose.model('Test', TestSchema);