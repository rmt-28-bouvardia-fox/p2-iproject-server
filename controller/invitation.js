const { Invitation, Template } = require("./../models");
const apiKey = process.env.GOOGLE_API_KEY

class Controller {
  static async createInvitation(req, res, next) {
    try {
      const {
        groomName,
        fatherGroom,
        motherGroom,
        BrideName,
        fatherBride,
        motherBride,
        weddingDate,
        weddingLocation,
        TemplateId,
      } = req.body;
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
        TemplateId,
        coupleName: `${groomName}&${BrideName}`,
        maps:`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${weddingLocation.split(' ').join('+')}`
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async readInvitation(req, res, next) {
    try {
      const { coupleName } = req.params;
      const findInvitation = await Invitation.findOne({
        where: { coupleName },
        include:[
          {model: Template}
        ]
      });
      if (!findInvitation) {
        throw { name: "Data not found" };
      } else {
        res.status(200).json(findInvitation);
      }
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async updateInvitation(req, res, next) {
    try {
      const { coupleName } = req.params;
      const findInvitation = await Invitation.findOne({
        where: { coupleName },
      });
      if (!findInvitation) {
        throw { name: "Data not found" };
      }
      const {
        groomName,
        fatherGroom,
        motherGroom,
        BrideName,
        fatherBride,
        motherBride,
        weddingDate,
        weddingLocation,
      } = req.body;

      const update = await Invitation.update(
        {
          UserId: req.user.id,
          groomName,
          fatherGroom,
          motherGroom,
          BrideName,
          fatherBride,
          motherBride,
          weddingDate,
          weddingLocation,
          coupleName: `${groomName}&${BrideName}`,
        },
        { where: { id: findInvitation.id } }
      );

      res.status(200).json("Success");
    } catch (error) {
      next(error);
    }
  }
  static async deleteInvitation(req, res, next) {
    try {
      const { coupleName } = req.params;
      const findInvitation = await Invitation.findOne({
        where: { coupleName },
      });
      if (!findInvitation) {
        throw { name: "Data not found" };
      }
      const deleted = await Invitation.destroy({
        where: { id: findInvitation.id },
      });

      res.status(200).json("Success");
    } catch (error) {
      next(error);
    }
  }

  static async getTemplate(req, res, next) {
    try {
      const template = await Template.findAll();
      res.status(200).json(template);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
