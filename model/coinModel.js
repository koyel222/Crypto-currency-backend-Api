const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    id : {
        type : String
    },
    symbol : {
        type : String
    },
    name : {
        type : String
    }
});

module.exports = mongoose.model('Coin',coinSchema);