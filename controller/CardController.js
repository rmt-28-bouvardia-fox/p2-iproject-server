const axios = require("axios");

const details = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids) {
      throw { name: "ids_not_provided" };
    }

    const stringOfIDs = ids.replace(/\s+/g, "");

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params: {
        id: stringOfIDs,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { query, offset, num, type, race, attribute } = req.query;

    let params = {};

    if (query) {
      params.fname = query;
    }

    if (type) {
      params.type = type;
    }

    if (race) {
      params.race = race;
    }

    if (attribute) {
      params.attribute = attribute;
    }

    if (offset && num) {
      params.offset = offset;
      params.num = num;
    } else {
      params.offset = 0;
      params.num = 5;
    }

    const { data } = await axios({
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
      method: "GET",
      params,
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { search, details };
