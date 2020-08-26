const Manga = require("../models/manga");

createManga = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  const manga = new Manga(body);
  if (!manga) {
    return res.status(400).json({ success: false, error: err });
  }
  manga
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: manga._id,
        messagge: "Manga created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Manga not created",
      });
    });
};
updateManga = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add a body to update",
    });
  }
  Manga.findOne({ _id: req.params.id }, (err, manga) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Manga not found :(",
      });
    }
    manga.title = body.title;
    manga.magazine = body.magazine;
    manga.volumes = body.volumes;
    manga.copies = body.copies;
    manga.price = body.price;
    manga.cover = body.cover;
    manga.sinopsis = body.sinopsis;
    manga.route = body.route;
    manga
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: manga._id,
          messagge: "Manga updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Manga not updated",
        });
      });
  });
};
deleteManga = async (req, res) => {
  await Manga.findOneAndDelete({ _id: req.params.id }, (err, manga) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!manga) {
      return res.status(404).json({
        success: false,
        error: "Manga not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: manga,
    });
  }).catch((error) => {
    return res.status(404).json({
      error,
      message: "Manga not deleted",
    });
  });
};
getMangaById = async (req, res) => {
  await Manga.findOne({ _id: req.params.id }, (err, manga) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!manga) {
      return res.status(404).json({ success: false, error: `Manga not found` });
    }
    return res.status(200).json({ success: true, data: manga });
  }).catch((err) => console.log(err));
};

getMangas = async (req, res) => {
  await Manga.find({}, (err, mangas) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!mangas.length) {
      return res.status(404).json({ success: false, error: `Manga not found` });
    }
    return res.status(200).json({ success: true, data: mangas });
  }).catch((err) => console.log(err));
};

module.exports = {
  createManga,
  updateManga,
  deleteManga,
  getMangas,
  getMangaById,
};
