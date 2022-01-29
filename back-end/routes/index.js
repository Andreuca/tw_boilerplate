const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const dbRouter = require("./db");
const projectRouter = require("./project");
const gradeRouter = require("./grade");

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/grade", gradeRouter);
router.use("/", dbRouter);

module.exports = router;
