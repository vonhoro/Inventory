const express = require("express");
const FigureCtrl = require("../controller/figures");
const router = express.Router();

router.post("/figure", FigureCtrl.createFigure);
router.put("/figure/:id", FigureCtrl.updateFigure);
router.delete("/figure/:id", FigureCtrl.deleteFigure);
router.get("/figure/:id", FigureCtrl.getFigureById);
router.get("/figures", FigureCtrl.getFigures);
module.exports = router;
