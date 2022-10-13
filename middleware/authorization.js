const { Invitation } = require("./../models");

const authorization = async (req, res, next) => {
  try {
    const { coupleName } = req.params;

    const findInvitation = await Invitation.findOne({ where: { coupleName } });

    if (!findInvitation) {
      throw { name: "Data not found" };
    }

    if (findInvitation.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
