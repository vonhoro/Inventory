const express = require("express");
const MangaCtrl = require("../controller/manga");
const router = express.Router();

router.post("/manga", MangaCtrl.createManga);
router.put("/manga/:id", MangaCtrl.updateManga);
router.delete("/manga/:id", MangaCtrl.deleteManga);
router.get("/manga/:id", MangaCtrl.getMangaById);
router.get("/mangas", MangaCtrl.getMangas);
module.exports = router;
