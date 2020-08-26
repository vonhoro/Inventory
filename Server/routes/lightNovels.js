const express = require("express");
const LightNovelCtrl = require("../controller/lightNovel");
const router = express.Router();

router.post("/lightnovel", LightNovelCtrl.createLightNovel);
router.put("/lightnovel/:id", LightNovelCtrl.updateLightNovel);
router.delete("/lightnovel/:id", LightNovelCtrl.deleteLightNovel);
router.get("/lightnovel/:id", LightNovelCtrl.getLightNovelById);
router.get("/lightnovels", LightNovelCtrl.getLightNovels);
module.exports = router;
