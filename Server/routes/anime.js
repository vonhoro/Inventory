const express = require("express");
const AnimeCtrl = require("../controller/anime");
const router = express.Router();

router.post("/anime", AnimeCtrl.createAnime);
router.put("/anime/:id", AnimeCtrl.updateAnime);
router.delete("/anime/:id", AnimeCtrl.deleteAnime);
router.get("/anime/:id", AnimeCtrl.getAnimeById);
router.get("/animes", AnimeCtrl.getAnimes);
module.exports = router;
