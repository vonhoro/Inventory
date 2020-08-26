const Figure = require("../models/figures");

createFigure = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  const figure = new Figure(body);
  if (!figure) {
    return res.status(400).json({ success: false, error: err });
  }
  figure
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: figure._id,
        messagge: "Figure created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Figure not created",
      });
    });
};
updateFigure = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  Figure.findOne({ _id: req.params.id }, (err, figure) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Figure not found :(",
      });
    }
    figure.name = body.name;
    figure.producer = body.producer;
    figure.copies = body.copies;
    figure.price = body.price;
    figure.cover = body.cover;
    figure.route = body.route;
    figure
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: figure._id,
          messagge: "Figure updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Figure not updated",
        });
      });
  });
};
deleteFigure = async (req, res) => {
  await Figure.findOneAndDelete({ _id: req.params.id }, (err, figure) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!figure) {
      return res.status(404).json({
        success: false,
        error: "Figure not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: figure,
    });
  }).catch((error) => {
    return res.status(404).json({
      error,
      message: "Figure not deleted",
    });
  });
};
getFigureById = async (req, res) => {
  await Figure.findOne({ _id: req.params.id }, (err, figure) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!figure) {
      return res
        .status(404)
        .json({ success: false, error: `Figure not found` });
    }
    return res.status(200).json({ success: true, data: figure });
  }).catch((err) => console.log(err));
};

getFigures = async (req, res) => {
  await Figure.find({}, (err, figures) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!figures.length) {
      return res
        .status(404)
        .json({ success: false, error: `Figure not found` });
    }
    return res.status(200).json({ success: true, data: figures });
  }).catch((err) => console.log(err));
};

module.exports = {
  createFigure,
  updateFigure,
  deleteFigure,
  getFigures,
  getFigureById,
};
