var express = require("express");
var router = express.Router();
const Document = require("../models/document");

router.get("/", (req, res, next) => {
  Document.find()
    .then((documents) => {
      res.status(200).json({
        message: "Documents fetched successfully",
        documents: documents,
      });
    })
    .catch((error) => {
      returnError(res, error);
    });
});

router.post("/", (req, res, next) => {
  const document = new Document({
    id: Math.random() * (50000 - 10000) + 10000,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: "Car added successfully",
        document: createdDocument,
      });
    })
    .catch((error) => {
      returnError(res, error);
    });
});

router.put("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then((result) => {
          res.status(204).json({
            message: "Car updated successfully",
          });
        })
        .catch((error) => {
          returnError(res, error);
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Car not found.",
        error: { document: "Car not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      Document.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({ message: "Car deleted successfully" });
        })
        .catch((error) => {
          returnError(res, error);
        });
    })
    .catch((error) => {
      returnError(res, error);
    });
});

module.exports = router;
