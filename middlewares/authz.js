const { Activity } = require("../models/index");

const authz = async (req, res, next) => {
  try {
    const id = req.params.activityId;
    const currentStatus = req.user.status;
    const currentId = req.user.id;
    let activity = await Activity.findOne({ where: { id: id } });

    if (!activity) {
      throw { name: "NotFound" };
    }

    if (currentStatus === "Regular" && activity.status == 'Premium') {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authz;
