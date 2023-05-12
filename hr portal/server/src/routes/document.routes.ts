import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, `${__dirname}/../../uploads`);
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express.Router();

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let doc = await sp.web
      .getFolderByServerRelativePath(`documentsLibrary/${id}`)
      .files();
    res.send(doc);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post(
  "/:id",
  upload.single("document"),
  async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params;
    res.send(data);
  }
);

module.exports = app;
