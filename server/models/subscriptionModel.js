const mongoose = require ('mongoose');


let subscriptionSchema = new mongoose.Schema({
    movieId: [String],
    memberId: String,
    date:String 
    // { 
    //     //  type: Date,
    //     //   default: Date.now() 
    //     }
});

module.exports = mongoose.model('subscriptions', subscriptionSchema)



// let subscriptionSchema = new mongoose.Schema({
//     movieId:{type: mongoose.Schema.Types.objectId, ref: 'movies'},
//     memberId: {type: mongoose.Schema.Types.objectId, ref: 'members'},
//     date: { type: Date, default: Date.now }
// });


