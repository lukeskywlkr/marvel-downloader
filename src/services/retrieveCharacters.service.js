const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('../config/config');
const logger = require('../config/logger');
const Character = require('../models/character.model');

const saveCharactersInDatabase = async (characters) => {
  characters.forEach((char) => {
    if (!(Date.parse(char.modified) >= 0)) {
      // eslint-disable-next-line no-param-reassign
      char.modified = new Date();
    }
    return char;
  });
  Character.create(characters);
};

const createRequestURL = async (limit, offset) => {
  const getCharacterURI = '/v1/public/characters';

  const reqURL = new URL(`${config.marvel.baseUrl}${getCharacterURI}`);
  const ts = Date.now();
  const hash = crypto.createHash('md5');
  hash.update(`${ts}${config.marvel.privKey}${config.marvel.pubKey}`);
  reqURL.searchParams.append('ts', ts);
  reqURL.searchParams.append('apikey', config.marvel.pubKey);
  reqURL.searchParams.append('hash', hash.digest('hex'));
  reqURL.searchParams.append('limit', limit);
  reqURL.searchParams.append('offset', offset);

  logger.debug(reqURL.toString());

  return reqURL;
};

const getCharactersFromMarvel = async (limit, offset) => {
  const reqURL = await createRequestURL(limit, offset);

  const response = await fetch(reqURL.toString());
  const serverRes = await response.json();

  if (serverRes && serverRes.data && serverRes.data.results && serverRes.data.results.length > 0) {
    return serverRes;
  }
};

const populateDatabase = async () => {
  const numAvail = (await Character.find()).length;
  if (!(numAvail > 0)) {
    let limit = 100;
    let offset = 0;
    let total = 0;

    do {
      const serverRes = await getCharactersFromMarvel(limit, offset);
      total = serverRes.data.total;
      if (total - offset < limit) limit = total - offset;
      offset += limit;
      await saveCharactersInDatabase(serverRes.data.results);
    } while (offset < total);
  }
};

module.exports = {
  populateDatabase,
};
