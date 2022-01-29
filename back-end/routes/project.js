const express = require("express");
const router = express.Router();
const projectController = require("../controllers").project;

router.get("/", projectController.getAll);
router.get("/:id", projectController.getProject);

module.exports = router;
