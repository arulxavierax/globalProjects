import { sp } from "@pnp/sp-commonjs";
import express, { Request, Response } from "express";

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

app.patch("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, email, gender, city } = req.body;
  try {
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).update({
      name,
      phone,
      email,
      gender,
      city,
    });
    // if (image !== "") {
    //   let c = await sp.web
    //     .getFolderByServerRelativePath(`documentsLibrary/${id}`)
    //     .files.addUsingPath(fileNamePath, image, { Overwrite: true });
    //   await list.items.getById(+id).update({
    //     imageUrl: c.data.ServerRelativeUrl,
    //   });
    // }
    res.send("User Updated Succesfully");
  } catch (e) {
    res.send(e);
  }
});

app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('first')
    const list = sp.web.lists.getByTitle("user");
    await list.items.getById(+id).delete();
    res.send("User Deleted Succesfully");
  } catch (e) {
    res.send(e);
  }
});

module.exports = app;
