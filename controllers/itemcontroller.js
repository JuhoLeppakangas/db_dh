// controllers/merchantController.js
const Item = require('../models/Item');
//const Item = require('../models/Item');

const ItemController = {
  // 1) Kaikki encounterit
  findAll(req, res) {
    Item.find()
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = ItemController;
