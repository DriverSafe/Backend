const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationControl");

router.get("/", locationController.getLocations);
router.get("/:id", locationController.getLocation);
router.post("/", locationController.createLocation);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);
router.delete("/", locationController.deleteAllLocations);

module.exports = router;
