import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";
const multer = require("multer");
const storage = require("../multer/multer");
const fs = require("fs");

const upload = multer({ storage: storage });

const app = express.Router();

app.get("/", async (req: Request, res: Response) => {
  try {
    const items: any[] = await sp.web.lists.getByTitle("user").items();
    res.send(items);
  } catch (e) {
    res.send(e);
  }
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let data = await sp.web.lists.getByTitle("user").items.getById(+id)();
    res.send(data);
  } catch (e) {
    res.status(400).send("Something Went Wrong");
  }
});

app.post("/adduser", async (req: Request, res: Response) => {
  const form = req.body;
  try {
    const postData = await sp.web.lists.getByTitle("user").items.add(form);
    let response = await sp.web
      .getFolderByServerRelativePath("documentsLibrary")
      .addSubFolderUsingPath(`${postData.data.Id}`);
    res.send(postData);
  } catch (e) {
    res.send(e);
  }
});

app.patch(
  "/update/:id",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = JSON.parse(req.body.data);

    try {
      const list = sp.web.lists.getByTitle("user");
      await list.items.getById(+id).update({
        name: data.name,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        city: data.city,
      });

      if ((req as any).file) {
        const photoData = fs.readFileSync((req as any).file?.path);
        let c = await sp.web
          .getFolderByServerRelativePath(`documentsLibrary/${id}`)
          .files.addUsingPath((req as any).file.originalname, photoData, {
            Overwrite: true,
          });
        await list.items.getById(+id).update({
          imageUrl: c.data.ServerRelativeUrl
            ? c.data.ServerRelativeUrl
            : data.imageUrl,
        });
      }
      res.send("Profile Updated");
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("first");
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).delete();
    res.send("User Deleted Succesfully");
  } catch (e) {
    res.send(e);
  }
});

module.exports = app;
