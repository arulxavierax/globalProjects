import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";
const multer = require("multer");
const fs = require("fs");
const getContentType = require("../utils/getContentType");
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

app.get("/download", async (req, res) => {
  const serverRelativePath = req.query.serverRelativePath as string;
  const file = sp.web.getFileByServerRelativePath(serverRelativePath);
  const buffer: ArrayBuffer = await file.getBuffer();
  console.log(buffer);

  const fileName = serverRelativePath.split("/").pop() || "";
  const contentType = getContentType(fileName);

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-type", contentType);
  res.status(200).send(Buffer.from(buffer));
});

module.exports = app;
