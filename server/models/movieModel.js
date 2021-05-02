const mongoose = require ('mongoose');

let movieSchema = new mongoose.Schema({
    name: String,
    yearPremiered: Number,
    image: String,
    genres: [String]
});

module.exports = mongoose.model('movies', movieSchema)