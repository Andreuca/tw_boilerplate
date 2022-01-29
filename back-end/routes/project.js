const express = require("express");
const router = express.Router();
const projectController = require("../controllers").project;

router.get("/", projectController.getAll);
router.get("/:id", projectController.getProject);
router.post("/", projectController.addProject);
router.patch("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
