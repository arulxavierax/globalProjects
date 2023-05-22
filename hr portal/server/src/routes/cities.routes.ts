import express, { Request, Response } from "express";
const cities = require("../citySchema/cities.model");

const app = express.Router();

app.get("/", async (req: Request, res: Response) => {
  try {
    let city = await cities.find();
    res.send(city);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
