var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    }
});


var Place = mongoose.model('Place', placeSchema, 'visited_places');

module.exports = Place;