import mongoSetup from "./app/database/config.js";
import { router } from "./app/routes/routes.js";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route

app.use("/api/v1/", router);

//PORT
const PORT = 3000;

//server
mongoSetup();

app.listen(PORT, () => {
  console.log("server is running at port ", PORT);
});