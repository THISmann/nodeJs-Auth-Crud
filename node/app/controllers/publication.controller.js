const db = require("../models");
const Publication = db.publication;
const Op = db.Sequelize.Op;
const fs = require("fs");
const multer = require("multer");
var multiparty = require("multiparty");
const uploadFile = require("../middleware/upload");
var form = new multiparty.Form();
/**
 * Create and Save a new Publication
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.create = async (req, res) => {

  // Save publication in the database
  form.parse(req, function (err, fields, files) {
      // Validate request
  if (!fields["title"][0]) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

    // Create a publication 
    const publication = {
      title: fields["title"][0],
      description: fields["description"][0],
      published: fields["published"][0],
      media: files.file[0].originalFilename,
    };

    Publication.create(publication)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the publication.",
        });
      });

  });

  await uploadFile(req, res);
};

// add file

/**
 * define pagine settings
 * @param {int} page
 * @param {int} size
 * @returns
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

/**
 *
 * @param {int} data
 * @param {int} page
 * @param {int} limit
 * @returns
 */
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: publications } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, publications, totalPages, currentPage };
};

/**
 * Retrieve all Publications from the database.
 * @param {*} req
 * @param {*} res
 */
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  Publication.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving publications.",
      });
    });
};

/**
 * Find a single Publication with an id
 * @param {*} req
 * @param {*} res
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Publication.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Publication with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Publication with id=" + id,
      });
    });
};

/**
 * Update a Publication by the id in the request
 * @param {*} req
 * @param {*} res
 */
exports.update = (req, res) => {
  const id = req.params.id;

  Publication.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Publication with id=${id}. Maybe Publication was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Publication with id=" + id,
      });
    });
};

/**
 * Delete a Publication with the specified id in the request
 * @param {*} req
 * @param {*} res
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Publication.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Publication with id=${id}. Maybe Publication was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Publication with id=" + id,
      });
    });
};

/**
 * Delete all Publications from the database.
 * @param {*} req
 * @param {*} res
 */
exports.deleteAll = (req, res) => {
  Publication.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Publications were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publications.",
      });
    });
};

/**
 * Find all published Publications
 * @param {*} req
 * @param {*} res
 */
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Publication.findAll({ where: { published: true }, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publications.",
      });
    });
};
