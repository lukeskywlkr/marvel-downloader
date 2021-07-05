const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  modified: {
    type: Date,
    required: false,
  },
  resourceURI: {
    type: String,
    required: false,
  },
  urls: {
    type: Array,
    required: false,
  },
  thumbnail: {
    type: Object,
    required: false,
  },
  comics: {
    type: Object,
    required: false,
  },
  stories: {
    type: Object,
    required: false,
  },
  events: {
    type: Object,
    required: false,
  },
  series: {
    type: Object,
    required: false,
  },
});

/**
 * @typedef Character
 */
const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
