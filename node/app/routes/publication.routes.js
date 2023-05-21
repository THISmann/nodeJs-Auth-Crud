const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const Publication = require("../controllers/publication.controller.js");
const file = require("../controllers/file.controller");
const db = require("../models");
const Publications = db.publication;
//const multer = require("../middleware/multer-config");
const fs = require("fs");
const multer = require("multer");
var multiparty = require("multiparty");
const uploadFile = require("../middleware/upload");
//const upload = multer({ dest: "public/files" });

//
var form = new multiparty.Form();

/**
 * route module for publication
 * @param {*} app
 */

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/publications", [authJwt.verifyToken],  Publication.create);

  // Retrieve all publications
  app.get("/api/publications", [authJwt.verifyToken], Publication.findAll);

  // Retrieve all published publications
  app.get(
    "/api/publications/published",
    [authJwt.verifyToken],
    Publication.findAllPublished
  );

  // Retrieve a single publication with id
  app.get("/api/publications/:id", [authJwt.verifyToken], Publication.findOne);

  // Update a publication with id
  app.put("/api/publications/:id", [authJwt.verifyToken], Publication.update);

  // Delete a publication with id
  app.delete(
    "/api/publications/:id",
    [authJwt.verifyToken],
    Publication.delete
  );

  // Delete all publications
  app.delete("/api/publications", [authJwt.verifyToken], Publication.deleteAll);
};
