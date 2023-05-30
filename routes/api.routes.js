const router = require("express").Router();

const {approvePropiedadesController,MunicipiosController} = require("../controllers");

// Get api
router.get("/apiv1/getpropiedad", approvePropiedadesController.getDataInformation);
router.get("/apiv1/getAllMunicipies", MunicipiosController.GetAllMunicipios)

module.exports = router;