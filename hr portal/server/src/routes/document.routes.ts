import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";

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

module.exports = app;
