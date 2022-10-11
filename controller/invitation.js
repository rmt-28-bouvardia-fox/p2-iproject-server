const { Invitation } = require("./../models");

class Controller {
  static async createInvitation(req, res, next) {
    try {
      const { groomName, fatherGroom, motherGroom, BrideName, fatherBride, motherBride, weddingDate, weddingLocation} = req.body;
      const result = await Invitation.create({
        UserId: req.user.id,
        groomName,
        fatherGroom,
        motherGroom,
        BrideName,
        fatherBride,
        motherBride,
        weddingDate,
        weddingLocation,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
