const express = require('express');
const { getCharacters } = require('../../controllers/characters.controller');

const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth(), getCharacters);

module.exports = router;
