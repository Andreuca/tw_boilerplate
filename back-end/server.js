const express = require("express");
const router = require("./routes");

const app = express();
const port = 8080;

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});