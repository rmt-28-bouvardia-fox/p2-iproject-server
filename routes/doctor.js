const router = require("express").Router();
const controllerDoctor = require("../controllers/controllerDoctor")

router.get("/", controllerDoctor.getAllDoctor)
router.post("/register", controllerDoctor.registerDoctor)
router.post("/login", controllerDoctor.loginDoctor)
router.use(require("../middlewares/loginAuthentication"))
router.get("/specialists", controllerDoctor.getAllSpecialist)

module.exports = router