import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";
const multer = require("multer");
const fs = require("fs");
const storage = require("../multer/multer");

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
    const data = fs.readFileSync((req as any).file.path);
    const { id } = req.params;
    if (data) {
      try {
        await sp.web
          .getFolderByServerRelativePath(`documentsLibrary/${id}`)
          .files.addUsingPath((req as any).file.originalname, data, {
            Overwrite: true,
          });
        res.send("Document uploaded");
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
);

module.exports = app;
