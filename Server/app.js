const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
require("dotenv/config");

const mongoDB = process.env.DB_CONNECTION;

const imageRouter = require("./routes/image");
const animeRouter = require("./routes/anime");
const mangaRouter = require("./routes/manga");
const figureRouter = require("./routes/figure");
const lightNovelRouter = require("./routes/lightNovels");
const app = express();
let apiPort = process.env.PORT;
if (apiPort == null || apiPort == "") {
  apiPort = 8000;
}

//middleWare

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const storage = new GridFsStorage({
  url: mongoDB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("Conected")
  )
  .catch((e) => {
    console.error("Conection error", e.message);
  });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
//

app.use("/api", imageRouter(upload));
app.use("/api", animeRouter);
app.use("/api", mangaRouter);
app.use("/api", lightNovelRouter);
app.use("/api", figureRouter);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
