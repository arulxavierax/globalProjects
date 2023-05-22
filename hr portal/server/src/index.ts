import express, { Application, Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const usersRoute = require("./routes/users.routes");
const documentRoute = require("./routes/document.routes");
const cityRoute = require("./routes/cities.routes");
const dbConnect = require("./config/db");
const cors = require("cors");

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/arul2",
          "44cf17cf-7bae-4072-8f8a-917c2a5b5934",
          "lBIYmdkRU5z6Tti+b9CkPFcc+RY44LuW4lHF7EaaapQ="
        ),
    },
  });
};

SpfxConnection();

const app: Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", usersRoute);
app.use("/doc", documentRoute);
app.use("/city", cityRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(8080, async () => {
  await dbConnect();
  console.log(`Listening to port ${8080}`);
});
