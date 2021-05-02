const mongoose = require ('mongoose');

let memberSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    city: String
});

module.exports = mongoose.model('members', memberSchema)