const router = require("express").Router();

const {approvePropiedadesController,MunicipiosController,PropiedadesController} = require("../controllers");

// Get api
router.get("/apiv1/getpropiedad", approvePropiedadesController.getDataInformation);
router.get("/apiv1/getAllMunicipies", MunicipiosController.GetAllMunicipios);
router.get('/apiv1/getpropiedades',PropiedadesController.GetOnePropiedad);

module.exports = router;