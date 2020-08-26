const LightNovel = require("../models/lightNovels");

createLightNovel = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  const lightnovel = new LightNovel(body);
  if (!lightnovel) {
    return res.status(400).json({ success: false, error: err });
  }
  lightnovel
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: lightnovel._id,
        messagge: "LightNovel created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "LightNovel not created",
      });
    });
};
updateLightNovel = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  LightNovel.findOne({ _id: req.params.id }, (err, lightnovel) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "LightNovel not found :(",
      });
    }
    lightnovel.title = body.title;
    lightnovel.publisher = body.publisher;
    lightnovel.volumes = body.volumes;
    lightnovel.copies = body.copies;
    lightnovel.price = body.price;
    lightnovel.cover = body.cover;
    lightnovel.sinopsis = body.sinopsis;
    lightnovel.route = body.route;
    lightnovel
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: lightnovel._id,
          messagge: "LightNovel updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "LightNovel not updated",
        });
      });
  });
};
deleteLightNovel = async (req, res) => {
  await LightNovel.findOneAndDelete(
    { _id: req.params.id },
    (err, lightnovel) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!lightnovel) {
        return res.status(404).json({
          success: false,
          error: "LightNovel not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: lightnovel,
      });
    }
  ).catch((error) => {
    return res.status(404).json({
      error,
      message: "LightNovel not deleted",
    });
  });
};
getLightNovelById = async (req, res) => {
  await LightNovel.findOne({ _id: req.params.id }, (err, lightnovel) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!lightnovel) {
      return res
        .status(404)
        .json({ success: false, error: `LightNovel not found` });
    }
    return res.status(200).json({ success: true, data: lightnovel });
  }).catch((err) => console.log(err));
};

getLightNovels = async (req, res) => {
  await LightNovel.find({}, (err, lightnovels) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!lightnovels.length) {
      return res
        .status(404)
        .json({ success: false, error: `LightNovel not found` });
    }
    return res.status(200).json({ success: true, data: lightnovels });
  }).catch((err) => console.log(err));
};

module.exports = {
  createLightNovel,
  updateLightNovel,
  deleteLightNovel,
  getLightNovels,
  getLightNovelById,
};
