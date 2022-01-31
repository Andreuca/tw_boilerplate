const db = require("../config/db");
const sequelize = require("sequelize");

const Video = db.define(
  "video",
  {
    description: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
    },
    title: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
    },
    url: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
        is: ['^(https?:\\/\\/)?'+ // protocol'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$']
      },
    },
  },
);

module.exports = Video
