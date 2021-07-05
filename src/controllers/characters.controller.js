const Character = require('../models/character.model');

const getCharacters = async (req, res) => {
  const { page, limit } = req.query;
  if (!page || !limit) {
    const result = await Character.find();
    return res.send(result);
  }
  const result = await Character.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const total = await Character.countDocuments();
  return res.send({
    result,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
};

module.exports = {
  getCharacters,
};
