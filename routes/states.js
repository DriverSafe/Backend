const express = require("express");
const router = express.Router();

const stateController = require("../controllers/stateController");

router.get("/", stateController.getStates);
router.get("/:id", stateController.getState);
router.post("/", stateController.createState);
router.put("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;
