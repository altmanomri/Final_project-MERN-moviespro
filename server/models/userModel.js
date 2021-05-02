const mongoose = require ('mongoose');

let userSchema = new mongoose.Schema({
    full_Name: String,
    username:{
        type: String,
        unique: true
    },  
    password:  String
});

module.exports = mongoose.model('users', userSchema)